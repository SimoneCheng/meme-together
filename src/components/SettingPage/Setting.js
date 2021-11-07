import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Compressor from 'compressorjs';

import {
    getUserInfo,
    updateUserInfo,
    updatePassword,
    uploadProfileImg,
    getProfileImg
} from '../../utlis/firebase';
require('dotenv').config();

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
  width: 200px;
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

    const clickUploadProfileImg = (e) => {
        const image = e.target.files[0];
        if (image) {
            new Compressor(image, {
                quality: 0.8,
                success: (compressedResult) => {
                    uploadProfileImg(userData.user_id, compressedResult)
                        .then(() => {
                            getProfileImg(userData.user_id)
                                .then((url) => {
                                    const data = { user_img: url };
                                    updateUserInfo(userData.user_id, data);
                                })
                        })
                },
            });
        }
    }

    const clickDefaultProfileImg = () => {
        const data = { user_img: process.env.REACT_APP_defaultProfileImg }
        updateUserInfo(userData.user_id, data);
    }

    return (
        <Container0>
            <Container1>
                <a href="#self-info">修改個人資料</a>
                <a href="#password">修改密碼</a>
                {/* <a href="#privacy">隱私設定</a> */}
                <a href="#account">刪除帳戶</a>
            </Container1>
            <div>
                <div id="self-info">
                    <h1>修改個人資料</h1>
                    <hr></hr>
                    <div>
                        <h2>修改頭像</h2>
                        {userInfo ? <Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
                        {userInfo ? <input type="file" accept="img/*" onChange={(e) => clickUploadProfileImg(e)} /> : ""}
                        {userInfo ? <button onClick={() => clickDefaultProfileImg()}>使用預設頭像</button> : ""}
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
                {/* <div id="privacy">
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
                </div> */}
                <div id="account">
                    <h1>刪除帳戶</h1>
                    <hr></hr>
                    <p>請輸入密碼</p>
                    <input type="password" />
                    <br></br>
                    <button>刪除帳戶</button>
                </div>
            </div>
        </Container0>
    )
}

export default Setting;