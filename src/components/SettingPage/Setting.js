import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getUserInfo } from '../../utlis/firebase';
import { wholePageLoading } from '../../utlis/loading';
import UserInfo from './UserInfo';
import Password from './Password';
import DeleteAccount from './DeleteAccount';
require('dotenv').config();

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D0D0D0;
  overflow: hidden;
  width: 200px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 100px);
  }
`;

const Container2 = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  width: 800px;
  @media screen and (max-width: 800px) {   
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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

const Container11 = styled.div`
  border-top: 1px solid #D0D0D0;
  padding: 10px;
  border-left: ${props => props.status === 'deleteaccount' ? '4px solid #ffc349' : '4px solid transparent'};
  cursor: pointer;
  &:hover{
      background-color: #F0F0F0;
  }
`;

function Setting() {
  const userData = useSelector((state) => state.userData);
  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState('userinfo');
  const history = useHistory();

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
              <Container11 status={status} onClick={() => setStatus('deleteaccount')}>刪除帳戶</Container11>
            </Container1>
            {status === 'userinfo' ? <UserInfo userInfo={userInfo} /> : ""}
            {status === 'password' ? <Password /> : ""}
            {status === 'deleteaccount' ? <DeleteAccount /> : ""}
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