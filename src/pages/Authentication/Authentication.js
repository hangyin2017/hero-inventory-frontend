import React from "react";
import styled from "styled-components";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";

const Layout = styled.div`
  height: 80vh;
  width: 80vw;
  display: flex;
`;

const Left = styled.div`
  width: 60%;
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MODAL = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  EMPTY: "",
};

const Shield = styled.div`
  bottom: 20px;
  width: 70%;
`;

const ShieldTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`;

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: MODAL.SIGN_IN,
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

  render() {
    const { showModal } = this.state;

    return (
      <Layout>
        <Left showModal={showModal}>
          {showModal === MODAL.SIGN_IN && (
            <SignInModal onSignUp={this.showModal(MODAL.SIGN_UP)} 
            />)}
          {showModal === MODAL.SIGN_UP && (
            <SignUpModal onSignIn={this.showModal(MODAL.SIGN_IN)} 
            />)}
        </Left>
        <Right>
          <Shield>
            <ShieldTitle>KEEP YOUR ACCOUNT SECURE</ShieldTitle>
            <div>
              OneAuth is our new in-house multi-factor authentication app.
              Shield your account with OneAuth now.
            </div>
          </Shield>
        </Right>
      </Layout>
    );
  }
}

export default Authentication;
