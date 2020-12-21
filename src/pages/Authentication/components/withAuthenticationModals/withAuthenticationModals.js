import React from 'react';
import SignInModal from '../SignInModal';
import SignUpModal from '../SignUpModal';

const MODAL = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  EMPTY: "",
};
const withAuthenticationModals = (Component) => {
  class AuthenticationModals extends React.Component{
    constructor(props) {
      super(props);
  
      this.state = {
        showModal: MODAL.SIGN_IN,
        user: null,
      };
  
      this.showModal = this.showModal.bind(this);
    }
    showModal(target) {
      return (event) => {
        event.preventDefault();
        this.setState({
          showModal: target,
        });
      };
    }
    setUser(value){
      this.setState({
        user: value
      });
    }
    render(){
      const {showModal, user} = this.state;
      return(
        <React.Fragment>
        <Component
        {...this.props}
        user={user}
        showModal={this.showModal}
        />
         {showModal === MODAL.SIGN_IN && (
          <SignInModal 
          onSignUp={this.showModal(MODAL.SIGN_UP)}
          onSignIn={(data)=>this.setUser(data)}
          />)}
        {showModal === MODAL.SIGN_UP && (
          <SignUpModal onSignIn={this.showModal(MODAL.SIGN_IN)} 
          />)}
          </React.Fragment>
      )
    }

  }
  

  return withAuthenticationModals;

}

export default withAuthenticationModals;