import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserInfo } from '../../utlis/firebase';
import { wholePageLoading } from '../../utlis/loading';
import UserInfo from './UserInfo';
import Password from './Password';
import DeleteAccount from './DeleteAccount';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6
} from '../Styled/SettingPage/Setting';
require('dotenv').config();

function Setting() {
  const userData = useSelector((state) => state.userData);
  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState('userinfo');
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (userData === null) {
      history.push('/');
    }
    if (userData !== null && Object.keys(userData).length > 0) {
      getUserInfo(userData.user_id, setUserInfo);
    }
  }, [userData])

  return (
    <Container0>
      {userInfo ?
        <>
          <Container2>
            <Container1>
              <Container3><strong>個人設定</strong></Container3>
              <Container4 status={status} onClick={() => setStatus('userinfo')}>修改個人資料</Container4>
              <Container5 status={status} onClick={() => setStatus('password')}>修改密碼</Container5>
              <Container6 status={status} onClick={() => setStatus('deleteaccount')}>刪除帳戶</Container6>
            </Container1>
            {status === 'userinfo' ? <UserInfo userInfo={userInfo} /> : ""}
            {status === 'password' ? <Password /> : ""}
            {status === 'deleteaccount' ? <DeleteAccount /> : ""}
          </Container2>
        </>
        : wholePageLoading('spinningBubbles', '#056', 50, 50)}
    </Container0>
  )
}

export default Setting;