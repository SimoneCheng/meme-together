import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setIsSignupDisplayed } from '../../redux/actions';
import { alertError } from '../../utlis/alert';
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

    const clickSignup = (e) => {
        e.preventDefault();
        if (signupName.current.value === "") {
            alertError(undefined, '請輸入暱稱！');
            return;
        } else {
            nativeSignup(signupEmail.current.value, signupPassword.current.value, signupName.current.value)
                .then((res) => {
                    if (res) {
                        dispatch(setIsSignupDisplayed(false));
                    } else {
                        return;
                    }
                });
        }
    }

    return (
        <Container0 >
            <Container1>
                <CloseButton onClick={() => { clickCloseButton() }}></CloseButton>
                <form>
                    <div>
                        <div>暱稱</div>
                        <Input1 type="text" placeholder="name" ref={signupName} autoComplete="on" />
                    </div>
                    <div>
                        <div>電子信箱</div>
                        <Input1 type="email" placeholder="email" ref={signupEmail} autoComplete="on" />
                    </div>
                    <div>
                        <div>密碼</div>
                        <Input1 type="password" placeholder="password" ref={signupPassword} autoComplete="on" />
                    </div>
                    <SignupButton color={color} onClick={(e) => { clickSignup(e) }}>註冊</SignupButton>
                </form>
            </Container1>
        </Container0>
    )
}

export default Signup;