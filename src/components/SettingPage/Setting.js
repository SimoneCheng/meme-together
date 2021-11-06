import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
    getUserInfo,
    updateUserInfo,
    updatePassword
} from '../../utlis/firebase';

const Container0 = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img0 = styled.img`
  width: 100px;
`;

function Setting() {
    const userData = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState();
    const history = useHistory();
    const selfIntroTxt = useRef(null);
    const oldPassword = useRef(null);
    const newPassword1 = useRef(null);
    const newPassword2 = useRef(null);

    useEffect(() => {
        if (userData === null || Object.keys(userData).length === 0) {
            history.push('/');
        }
        if (userData !== null && Object.keys(userData).length > 0) {
            getUserInfo(userData.user_id, setUserInfo);
        }
    }, [userData])

    const clickUpdateSelfIntro = () => {
        const data = { self_intro: selfIntroTxt.current.value }
        updateUserInfo(userData.user_id, data).then(() => alert('個人簡介更新成功！'));
    }

    const clickUpdatePassword = () => {
        if (oldPassword.current.value === "") {
            alert('尚未輸入舊密碼！');
            return;
        } else if (newPassword1.current.value === "" || newPassword2.current.value === "") {
            alert('尚未輸入新密碼！');
            return;
        } else if (newPassword2.current.value !== newPassword1.current.value) {
            alert('請再輸入一次新密碼欄位有誤！');
            return;
        } else {
            updatePassword(oldPassword.current.value, newPassword1.current.value);
        }
    }

    return (
        <Container0>
            <Container1>
                <a href="#self-info">修改個人資料</a>
                <a href="#password">修改密碼</a>
                <a href="#privacy">隱私設定</a>
                <a href="#account">刪除帳戶</a>
            </Container1>
            <div>
                <div id="self-info">
                    <h1>修改個人資料</h1>
                    <hr></hr>
                    <div>
                        <h2>修改頭像</h2>
                        {userInfo ? <Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
                        {userInfo ? <button>上傳新頭像</button> : ""}
                    </div>
                    <div>
                        <h2>修改個人簡介</h2>
                        <span>個人簡介</span>
                        {userInfo ? <textarea rows="5" cols="33" defaultValue={userInfo.self_intro} ref={selfIntroTxt} /> : ""}
                        {userInfo ? <button onClick={() => clickUpdateSelfIntro()}>儲存</button> : ""}
                    </div>
                </div>
                <div id="password">
                    <h1>修改密碼</h1>
                    <hr></hr>
                    <p>舊密碼</p>
                    <input type="password" ref={oldPassword} />
                    <p>新密碼</p>
                    <input type="password" ref={newPassword1} />
                    <p>請再輸入一次新密碼</p>
                    <input type="password" ref={newPassword2} />
                    <br></br>
                    <button onClick={() => clickUpdatePassword()}>送出</button>
                </div>
                <div id="privacy">
                    <h1>隱私設定</h1>
                    <hr></hr>
                    <p>個人公開頁面瀏覽權限設定</p>
                    <div>
                        <input type="radio" id="personal" name="privacy" value="personal-only" />
                        <label for="personal">僅限本人</label>
                        <input type="radio" id="friends" name="privacy" value="friends-only" />
                        <label for="friends">追蹤你的粉絲</label>
                        <input type="radio" id="public" name="privacy" value="public" defaultChecked />
                        <label for="public">所有人</label>
                    </div>
                </div>
                <div id="account">
                    <h1>刪除帳戶</h1>
                    <hr></hr>
                    <button>刪除帳戶</button>
                </div>
            </div>
        </Container0>
    )
}

export default Setting;