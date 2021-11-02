import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setIsSignupDisplayed } from '../../redux/actions';
import { nativeSignup } from '../../utlis/firebase';
import color from '../Styled/colorTheme';
import {
    Container0,
    Container1,
    Input1,
    SignupButton,
    CloseButton,
} from '../Styled/Popup';

function Signup() {
    const dispatch = useDispatch();
    const signupEmail = useRef(null);
    const signupPassword = useRef(null);
    const signupName = useRef(null);
    
    const clickCloseButton = () => {
        dispatch(setIsSignupDisplayed(false));
    }
    
    const clickSignup = () => {
        nativeSignup(signupEmail.current.value, signupPassword.current.value, signupName.current.value)
            .then(() => {
                dispatch(setIsSignupDisplayed(false));
            });
    }

    return (
        <Container0 >
            <Container1>
                <CloseButton onClick={() => { clickCloseButton() }}></CloseButton>
                <div>
                    <div>暱稱</div>
                    <Input1 type="text" placeholder="name" ref={signupName} />
                </div>
                <div>
                    <div>電子信箱</div>
                    <Input1 type="email" placeholder="email" ref={signupEmail} />
                </div>
                <div>
                    <div>密碼</div>
                    <Input1 type="password" placeholder="password" ref={signupPassword} />
                </div>
                <SignupButton color={color} onClick={() => { clickSignup() }}>註冊</SignupButton>
            </Container1>
        </Container0>
    )
}

export default Signup;