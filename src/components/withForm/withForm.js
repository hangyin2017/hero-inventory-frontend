import React from 'react';

const withForm = (FIELDS) => (Component) => {
  // const getInitialData = () => FIELDS.reduce((data, f) => ({
  //   ...data,
  //   [f.key]: {
  //     value: '',
  //     dirty: false,
  //   }
  // }), {});
  class Form extends React.Component{
    constructor(props) {
      super(props);

      this.FIELDS = FIELDS || this.props.FIELDS;
      
      this.state = {
        data: this.getInitialData(),
        formDirty: false,
      }

      this.getValidationMessage = this.getValidationMessage.bind(this);
      this.setData = this.setData.bind(this);
      this.submit = this.submit.bind(this);
    }

    getInitialData() {
      return this.FIELDS.reduce((data, f) => ({
        ...data,
        [f.key]: {
          value: '',
          dirty: false,
        }
      }), {});
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
    
    getValidationMessage(field){
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
      const formHasErrorMessage = this.FIELDS.find((f) => this.getValidationMessage(f));
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
          getValidationMessage={this.getValidationMessage}
          setData={this.setData}
          submit={this.submit}
        />
      );
    }
  }

  return Form;
};

export default withForm;
