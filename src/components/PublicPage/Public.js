import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getUserInfo,
  getPublicMemeImg,
  addFollower,
  addFollowing,
  checkAllFollowing,
  checkAllFollowers,
  unfollowing,
  deleteFollower
} from '../../utlis/firebase';
import AllFollowing from './AllFollowing';
import AllPublicMemeImg from './AllPublicMemeImg';
import AllFollowers from './AllFollowers';

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
  const [allFollowing, setAllFollowing] = useState([]);
  const [allFollowers, setAllFlowers] = useState([]);
  const [allFollowingSelf, setAllFollowingSelf] = useState([]);
  const [status, setStatus] = useState('allPublicMeme');
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    getUserInfo(id, setUserInfo);
    getPublicMemeImg(id, setPublicMemeImg);
    checkAllFollowing(id, setAllFollowing);
    checkAllFollowers(id, setAllFlowers)
  }, [])

  useEffect(() => {
    if (userData !== null && Object.keys(userData).length > 0) {
      checkAllFollowing(userData.user_id, setAllFollowingSelf);
    }
  }, [userData])

  const followUser = () => {
    const data = { user_id: id };
    const selfData = { user_id: userData.user_id };
    addFollowing(userData.user_id, id, data)
      .then(() => addFollower(id, userData.user_id, selfData))
      .then(() => alert('追蹤成功！'));
  }

  const unfollowUser = () => {
    unfollowing(userData.user_id, id)
      .then(() => deleteFollower(id, userData.user_id))
      .then(() => alert('已取消追蹤！'));
  }

  return (
    <Container0>
      <Container1>
        <Container2>
          {userInfo ? <Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
          {userInfo ? userInfo.user_name : ""}
          <br></br>
          {userInfo ? userInfo.self_intro: ""}
          {userInfo
            && userData
            && Object.keys(userData).length > 0
            && userInfo.user_id !== userData.user_id
            && allFollowingSelf.includes(id) === false ? <button onClick={() => followUser()}>追蹤</button> : ""}
          {userInfo
            && userData
            && Object.keys(userData).length > 0
            && userInfo.user_id !== userData.user_id
            && allFollowingSelf.includes(id) === true ? <button onClick={() => unfollowUser()}>取消追蹤</button> : ""}
        </Container2>
        <Container2 onClick={() => setStatus('allPublicMeme')}>
          <p>我的創作</p>
          <p>{publicMemeImg.length}</p>
        </Container2>
        <Container2 onClick={() => setStatus('followers')}>
          <p>粉絲</p>
          <p>{allFollowers.length}</p>
        </Container2>
        <Container2 onClick={() => setStatus('following')}>
          <p>追蹤中</p>
          <p>{allFollowing.length}</p>
        </Container2>
      </Container1>
      <div>
        {status === 'allPublicMeme' ? <AllPublicMemeImg memeImg={publicMemeImg} /> : ""}
        {status === 'followers' ? <AllFollowers allFollowers={allFollowers} /> : ""}
        {status === 'following' ? <AllFollowing allFollowing={allFollowing} /> : ""}
      </div>
    </Container0>
  )
}

export default Public;