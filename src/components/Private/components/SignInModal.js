import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
position: fixed;
top: 0;
right:0;
bottom:0;
left:0;
height: 100vh;
width: 100vw;
background: rgba(0,0,0,0.65);
display: flex;
align-items: center;
justify-content:center;

`;

const Modal = styled.div`
position: absolute;
top: 50%;
left: 50%;
width: 600px;
`;

const Header = styled.div`
padding: 16px 24px;
text-align:center;
`;

const Title = styled.div`
font-size: 18px;
`;



const SignInModal = () => (
        <Overlay>
            <Modal>
                <Header>
                    <Title>SignInModal</Title>
                </Header>
            </Modal>
        </Overlay>
    );

export default SignInModal;