import React from 'react';

const WithFormSignUpModal = withForm(SignUpModal);
const withForm = (Component) => {
  class Form extends React.Component{
    render(){
      return (<Component {...this.props} />);
    }
  }
};

export default withForm;
