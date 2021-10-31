import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getUserInfo, getPublicMemeImg } from '../../utlis/firebase';
import AllPublicMemeImg from './AllPublicMemeImg';

const Container0 = styled.div`
  padding-top: 100px;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 20px 10px;
  width: 600px;
  margin: 0 auto;
`;

const Container2 = styled.div`
  margin-right: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const Img0 = styled.img`
  width: 200px;
  margin-right: 30px;
`;

function Public() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [publicMemeImg, setPublicMemeImg] = useState([]);

  useEffect(() => {
    getUserInfo(id, setUserInfo);
    getPublicMemeImg(id, setPublicMemeImg);
  }, [])

  return (
    <Container0>
      <Container1>
        <Container2>
          {userInfo ?　<Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
          {userInfo ? userInfo.user_name : ""}
        </Container2>
        <Container2>
          <p>我的創作</p>
          <p>{publicMemeImg.length}</p>
        </Container2>
        <Container2>
          <p>粉絲</p>
          <p>1000</p>
        </Container2>
        <Container2>
          <p>追蹤中</p>
          <p>0</p>
        </Container2>
      </Container1>
      <div>
        <AllPublicMemeImg memeImg={publicMemeImg} />
      </div>
    </Container0>
  )
}

export default Public;