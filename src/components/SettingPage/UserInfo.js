import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Compressor from 'compressorjs';

import {
    updateUserInfo,
    uploadProfileImg,
    getProfileImg
} from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';
import color from '../Styled/colorTheme';
require('dotenv').config();

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
  border: 2px solid transparent;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 20px;
  align-self: flex-start;
  :hover{
    border: 2px solid black;
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

function UserInfo(props) {
    const userData = useSelector((state) => state.userData);
    const userInfo = props.userInfo;
    const selfIntroTxt = useRef(null);

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

    const clickUpdateSelfIntro = () => {
        const data = { self_intro: `${selfIntroTxt.current.value}` }
        updateUserInfo(userData.user_id, data).then(() => alertSuccess('個人簡介更新成功！'));
    }

    return (
        <Container6>
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

export default UserInfo;