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
import { alertError, alertSuccess } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import { wholePageLoading } from '../../utlis/loading';
require('dotenv').config();

const Container0 = styled.div`
  padding-top: 100px;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D0D0D0;
  overflow: hidden;
  width: 200px;
`;

const Container2 = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  width: 800px;
`;

const Container3 = styled.div`
  padding: 10px;
`;

const Container4 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'userinfo' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

const Container5 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'password' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

const Container6 = styled.div`
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
`;

const Container7 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 5px solid #056;
  margin-bottom: 20px;
`;

const Container8 = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Container9 = styled.div`
  padding-top: 16px;
  padding-bottom: 50px;
`;

const Container10 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const Img0 = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input0 = styled.input`
  display: none;
`;

const Input1 = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  width: 80%;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Input2 = styled.textarea`
  width: 95%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  resize: none;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Button0 = styled.div`
  background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 20px;
  align-self: flex-start;
  :hover{
    outline: 2px solid black;
  }
`;

const Label0 = styled.label`
  background-color: ${props => props.color.color1.colorCode};
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80px;
  :hover{
    outline: 2px solid black;
  }
`;

function Setting() {
    const userData = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState();
    const [status, setStatus] = useState('userinfo');
    const history = useHistory();
    const selfIntroTxt = useRef(null);
    const oldPassword = useRef(null);
    const newPassword1 = useRef(null);
    const newPassword2 = useRef(null);

    useEffect(() => {
        if (userData === null) {
            history.push('/');
        }
        if (userData !== null && Object.keys(userData).length > 0) {
            getUserInfo(userData.user_id, setUserInfo);
        }
    }, [userData])

    const clickUpdateSelfIntro = () => {
        const data = { self_intro: selfIntroTxt.current.value }
        updateUserInfo(userData.user_id, data).then(() => alertSuccess('個人簡介更新成功！'));
    }

    const clickUpdatePassword = () => {
        if (oldPassword.current.value === "") {
            alertError(undefined, '尚未輸入舊密碼！');
            return;
        } else if (newPassword1.current.value === "" || newPassword2.current.value === "") {
            alertError(undefined, '尚未輸入新密碼！');
            return;
        } else if (newPassword2.current.value !== newPassword1.current.value) {
            alertError(undefined, '［請再輸入一次新密碼］欄位有誤！');
            return;
        } else {
            updatePassword(oldPassword.current.value, newPassword1.current.value);
        }
    }

    const clickUploadProfileImg = (e) => {
        const image = e.target.files[0];
        if (image) {
            new Compressor(image, {
                quality: 1,
                width: 400,
                success: (compressedResult) => {
                    uploadProfileImg(userData.user_id, compressedResult)
                        .then(() => {
                            getProfileImg(userData.user_id)
                                .then((url) => {
                                    const data = { user_img: url };
                                    updateUserInfo(userData.user_id, data);
                                })
                                .then(() => alertSuccess('成功更換頭像！'))
                        });
                },
            });
        }
    }

    const clickDefaultProfileImg = () => {
        const data = { user_img: process.env.REACT_APP_defaultProfileImg };
        updateUserInfo(userData.user_id, data)
            .then(() => alertSuccess('已更換成預設頭像！'));
    }

    const renderUserInfo = () => {
        return (
            <Container6 id="self-info">
                <Container7>修改個人資料</Container7>
                <Container9>
                    <Container8>頭像</Container8>
                    <Container10>
                        <Img0 alt="profile-img" src={userInfo.user_img}></Img0>
                        <div>
                            <Label0 color={color} htmlFor="image">
                                上傳新頭像
                                <Input0 id="image" type="file" accept="image/*" onChange={(e) => clickUploadProfileImg(e)} />
                            </Label0>
                            <Button0 style={{ 'marginTop': '30px' }} color={color} onClick={() => clickDefaultProfileImg()}>使用預設頭像</Button0 >
                        </div>
                    </Container10>
                </Container9>
                <div>
                    <Container8>個人簡介</Container8>
                    <Input2 cols="20" rows="5" defaultValue={userInfo.self_intro} ref={selfIntroTxt} />
                    <Button0 color={color} onClick={() => clickUpdateSelfIntro()}>儲 存</Button0 >
                </div>
            </Container6>
        )
    }

    const renderPassword = () => {
        return (
            <Container6 id="password">
                <Container7>修改密碼</Container7>
                <p>請輸入舊密碼：</p>
                <Input1 type="password" ref={oldPassword} />
                <p>請輸入新密碼：</p>
                <Input1 type="password" ref={newPassword1} />
                <p>請再輸入一次新密碼：</p>
                <Input1 type="password" ref={newPassword2} />
                <br></br>
                <Button0 color={color} onClick={() => clickUpdatePassword()}>送 出</Button0>
            </Container6>
        )
    }

    return (
        <Container0>
            {userInfo ?
                <>
                    <Container2>
                        <Container1>
                            <Container3><strong>個人設定</strong></Container3>
                            <Container4 status={status} onClick={() => setStatus('userinfo')}>修改個人資料</Container4>
                            <Container5 status={status} onClick={() => setStatus('password')}>修改密碼</Container5>
                        </Container1>
                        {status === 'userinfo' ? renderUserInfo() : ""}
                        {status === 'password' ? renderPassword() : ""}
                    </Container2>
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
                    </div>
                   */}
                </>
                : wholePageLoading('spinningBubbles', '#056', 50, 50)}
        </Container0>
    )
}

export default Setting;