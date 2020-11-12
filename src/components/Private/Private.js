import React from 'react';
import styled from 'styled-components';
import SignInModal from './components/SignInModal'

const Layout = styled.div`
display: flex;
`;

class Private extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSignInModal:false,
        }

        this.toggleSignInModal = this.toggleSignInModal.bind(this);

    }
    toggleSignInModal(event){
        event.preventDefault();
        this.setState((prevState)=>({
            showSignInModal: !prevState.showSignInModal,
        }));
    }
    render(){
        const { showSignInModal} = this.state;
        return(
            <React.Fragment>
            <Layout>
            <button onClick={this.toggleSignInModal}>
            Sign in
            </button>
            <button>
            Sign up
            </button>
           </Layout>
           {showSignInModal && (<SignInModal />)}
           </React.Fragment>
        )

    }
}


export default Private;