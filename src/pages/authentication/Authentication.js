import React from 'react';
import styled from 'styled-components';
import SignInModal from './components/SignInModal'
import SignUpModal from './components/SignUpModal'

const Layout = styled.div`
display: flex;
`;
 
const MODAL={
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
    EMPTY: '',
}
class Authentication extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         showModal:MODAL.EMPTY,
        }

        this.showModal = this.showModal.bind(this);

    }
    showModal(target){
        return(event)=> {
            event.preventDefault();
            this.setState({
                showModal:target,
            });
        };
    }
    render(){
        const { showModal} = this.state;
        return(
            <React.Fragment>
            <Layout>
            <button onClick={this.showModal(MODAL.SIGN_IN)}>
            Sign in
            </button>
            <button onClick={this.showModal(MODAL.SIGN_UP)}>
            Sign up
            </button>
           </Layout>
           {showModal ===MODAL.SIGN_IN && (
               <SignInModal 
               onClose={this.showModal(MODAL.EMPTY)} 
               onSignUp={this.showModal(MODAL.SIGN_UP)}/>
               )}
            {showModal === MODAL.SIGN_UP && (
                <SignUpModal
                onClose={this.showModal(MODAL.EMPTY)}
                onSignIn={this.showModal(MODAL.SIGN_IN)}/>
            )}
           </React.Fragment>
        )

    }
}


export default Authentication;