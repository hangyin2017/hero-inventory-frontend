import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal/Modal'

const SignInButton = styled.button`
outline: 0;
border: 0;
background: transparent;
padding:0;
cursor: pointer;
color: #008fb4;
`;

const SignInModal = ({
    onClose,
    onSignIn,
}) => (
            <Modal 
            onClose={onClose}
            title="Sign Up"
            content="sign up body"
            footer={(
                <>
                 Already a member?&nbsp;
                <SignInButton onClick={onSignIn}>Sign In Now</SignInButton>
                </>
            )}
            />
        //         {/* <Header> */}
        //             {/* <Title>Sign Up </Title>
        //             <Close onClick={onClose}>X</Close>
        //         </Header>
        //         <HorizontalRule />
        //         <Body> body </Body>
        //         <HorizontalRule />
        //         <Footer> 
        //         Already a member?&nbsp;
        //         <SignInButton onClick={onSignIn}>Sign In Now</SignInButton>
        //         </Footer>
        //     </Modal>
        // </Overlay> */}
    );
    SignInModal.propTypes ={
        onClose: PropTypes.func.isRequired,
        onSignUp: PropTypes.func.isRequired,
    };

export default SignInModal;