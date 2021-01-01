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

    updateField(field, value) {
      this.setState((prevState) => {
        const fieldData = prevState.data[field.key];
        return {
          data: {
            ...prevState.data,
            [field.key]: {
              ...fieldData,
              ...value,
            }, 
          },
        }
      });
    }

    setData(key) {
      return async (event) => {
        event.preventDefault();
        const { value } = event.target;
        const field = this.FIELDS.find((f) => f.key === key);
        this.updateField(field, { value, dirty: true });
        this.validateField(field, value);
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
      this.updateField(field, { errorMessage: null });
      
      for(let v of field.validations) {
        const valid = await v.validator(value, data);
        
        const currentValue = this.state.data[field.key].value;
        if(currentValue !== value) {
          return;
        }

        if(!valid) {
          this.updateField(field, { errorMessage: v.message });
          break;
        }
      }

    }

    async validateForm() {
      const { data } = this.state;
      await Promise.all(this.FIELDS.map((f) => this.validateField(f, data[f.key].value)));
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
