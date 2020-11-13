import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal/Modal'



const SignUpButton = styled.button`
outline: 0;
border: 0;
background: transparent;
padding:0;
cursor: pointer;
color: #008fb4;
`;

const SignInModal = ({
    onClose,
    onSignUp,
}) => (
            <Modal 
            onClose={onClose}
            title="Sign In"
            content="Sign In body"
            footer={(
                <>
                 Not a member yet?&nbsp;
                <SignUpButton onClick={onSignUp}>Sign Up Now</SignUpButton>
                </>
            )} />
      
    );
    SignInModal.propTypes ={
        onClose: PropTypes.func.isRequired,
        onSignUp: PropTypes.func.isRequired,
    };

export default SignInModal;