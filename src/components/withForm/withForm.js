import React from 'react';

const withForm = (FIELDS) => (Component) => {
  class Form extends React.Component{
    constructor(props) {
      super(props);

      this.FIELDS = FIELDS || this.props.FIELDS;
      
      this.state = {
        data: this.getInitialData(),
        formDirty: false,
      }

      this.validateField = this.validateField.bind(this);
      this.setData = this.setData.bind(this);
      this.submit = this.submit.bind(this);
    }

    getInitialData() {
      return this.FIELDS.reduce((data, f) => ({
        ...data,
        [f.key]: {
          value: '',
          dirty: false,
          errorMessage: null,
        }
      }), {});
    }

    setFormDirty(value) {
      this.setState({
        formDirty: value,
      });
    }

    setData(key) {
      return async (event) => {
        event.preventDefault();
        const { value } = event.target;
        const field = this.FIELDS.find((f) => f.key === key);
        this.validateField(field, value);
  
        this.setState((prevState) => {
          const fieldData = prevState.data[field.key];
          return {
            data: {
              ...prevState.data,
              [key]: {
                ...fieldData,
                value,
                dirty: true,
              }, 
            },
          }
        });
      };
    }

    submit(onSubmit) {
      return async (event) => {
        event.preventDefault();

        this.setFormDirty(true);
        await this.validateForm();

        if (this.formHasError()) {
          return;
        }
        
        onSubmit();
      }
    }
    
    async validateField(field, value){
      const { data } = this.state;
      let errorMessage = null;

      for(let v of field.validations) {
        const valid = await v.validator(value, data);
        if(!valid) {
          errorMessage = v.message;
          break;
        }
      }

      this.setState((prevState) => {
        const fieldData = this.state.data[field.key];
        return {
          data: {
            ...prevState.data,
            [field.key]: {
              ...fieldData,
              errorMessage,
            }, 
          }
        };
      });
    }

    async validateForm() {
      const { data } = this.state;
      this.FIELDS.forEach(async (f) => await this.validateField(f, data[f.key].value));
    }

    formHasError() {
      const { data } = this.state;
      const formHasErrorMessage = Object.keys(data).find((key) => data[key].errorMessage);
      return !!formHasErrorMessage;
    }

    render(){
      const { data, formDirty } = this.state;

      const valid = !this.formHasError();

      return (
        <Component
          {...this.props}
          data={data}
          formDirty={formDirty}
          valid={valid}
          validateField={this.validateField}
          setData={this.setData}
          submit={this.submit}
        />
      );
    }
  }

  return Form;
};

export default withForm;
