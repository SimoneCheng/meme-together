import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Compressor from 'compressorjs';

import {
  updateUserInfo,
  uploadProfileImg,
  getProfileImg
} from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Img0,
  Input0,
  Input2,
  Button0,
  Label0
} from '../Styled/SettingPage/Common';
require('dotenv').config();

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
    <Container0>
      <Container1>修改個人資料</Container1>
      <Container3>
        <Container2>頭像</Container2>
        <Container4>
          <Img0 alt="profile-img" src={userInfo.user_img}></Img0>
          <Container5>
            <Label0 color={color} htmlFor="image">
              上傳新頭像
              <Input0 id="image" type="file" accept="image/*" onChange={(e) => clickUploadProfileImg(e)} />
            </Label0>
            <Button0 style={{ 'marginTop': '20px' }} color={color} onClick={() => clickDefaultProfileImg()}>使用預設頭像</Button0 >
          </Container5>
        </Container4>
      </Container3>
      <div>
        <Container2>個人簡介</Container2>
        <Input2 cols="20" rows="5" defaultValue={userInfo.self_intro} ref={selfIntroTxt} />
        <Button0 color={color} onClick={() => clickUpdateSelfIntro()}>儲 存</Button0 >
      </div>
    </Container0>
  )
}

export default UserInfo;