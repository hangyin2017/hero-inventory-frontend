import React from 'react';

const withForm = (FIELDS) => (Component) => {
  const getInitialData = () => FIELDS.reduce((data, f) => ({
    ...data,
    [f.key]: {
      value: '',
      dirty: false,
    }
  }), {});

  class Form extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        data: getInitialData(),
        formDirty: false,
      }

      this.getErrorMessage = this.getErrorMessage.bind(this);
      this.setData = this.setData.bind(this);
      this.submit = this.submit.bind(this);
    }

    setFormDirty(value) {
      this.setState({
        formDirty: value,
      });
    }

    setData(key) {
      return (event) => {
        event.preventDefault();
        const { value } = event.target;
  
        this.setState((prevState) => ({
          data: {
            ...prevState.data,
            [key]: {
              value,
              dirty: true,
            }, 
          },
        }));
      };
    }

    submit(onSubmit) {
      return (event) => {
        event.preventDefault();

        this.setFormDirty(true);

        if (!this.valid()) {
          return;
        }
        
        onSubmit();
      }
    }
    
    getErrorMessage(field){
      const { data } = this.state;
      const { key, validations} = field;
      const { value } = data[key];
      const invalidValidation = validations.find((v) => !v.validator(value, data));

      if(!invalidValidation){
        return null;
      }
      return invalidValidation.message;
    }

    valid() {
      const formHasErrorMessage = FIELDS.find((f) => this.getErrorMessage(f));
      return !formHasErrorMessage;
    }

    render(){
      const { data, formDirty } = this.state;

      const valid = this.valid()

      return (
        <Component
          {...this.props}
          data={data}
          formDirty={formDirty}
          valid={valid}
          getErrorMessage={this.getErrorMessage}
          setData={this.setData}
          submit={this.submit}
        />
      );
    }
  }

  return Form;
};

export default withForm;
