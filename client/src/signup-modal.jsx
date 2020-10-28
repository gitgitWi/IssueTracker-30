import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useEffect } from 'react';
import SignUpForm from "./signup-form.jsx";
import { withRouter } from 'react-router-dom';

const ModalSignup = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    left: 0;
    top: 20%;
    z-index: 1;
`;
const ModalSignupContent = styled.div`
    width: 300px;
    margin: 100px auto;
    padding: 20px 10px;
    background: #fff;
    border: 2px solid #666;
`;
const ModalSignupLayer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: rgba(0, 0, 0, 0.4);
`;

const CloseBtn = styled.button`
    position: relative;
    left: -33%;
`;

const closeModal = history => {
    history.goBack();
}

const SignupModal = ({ history }) => {
    return (
        <ModalSignup>
            <ModalSignupContent>
                <CloseBtn onClick={() => closeModal(history)}>X</CloseBtn>
                회원가입 폼
                <SignUpForm />
            </ModalSignupContent>
            <ModalSignupLayer onClick={() => closeModal(history)} />
        </ModalSignup>
    );
};

export default withRouter(SignupModal);