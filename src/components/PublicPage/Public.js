import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { wholePageLoading } from '../../utlis/loading';
import { alertSuccess } from '../../utlis/alert';
import AllFollowing from './AllFollowing';
import AllPublicMemeImg from './AllPublicMemeImg';
import AllFollowers from './AllFollowers';

const Container0 = styled.div`
  padding-top: 100px;
  background-color: #056;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 10px;
  margin: 0 auto;
  width: 800px;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

const Container3 = styled.div`
  padding-top: 10px;
  white-space: pre-line;
`;

const Container4 = styled.div`
  margin: 30px auto 0 auto;
  width: 800px;
  color: #fff;
  border-bottom: 2px solid #fff;
  font-size: 2rem;
`;

const Container5 = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  width: 100px;
  padding-top: 20px;
  &:hover{
    box-shadow: 0 0 5px #ccc;
  }
`;

const Img0 = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
`;

const Button0 = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ffc349;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  :hover{
    outline: 2px solid black;
  }
`;

function Public() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [publicMemeImg, setPublicMemeImg] = useState();
  const [allFollowing, setAllFollowing] = useState();
  const [allFollowers, setAllFlowers] = useState();
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
      .then(() => alertSuccess('追蹤成功！'));
  }

  const unfollowUser = () => {
    unfollowing(userData.user_id, id)
      .then(() => deleteFollower(id, userData.user_id))
      .then(() => alertSuccess('已取消追蹤！'));
  }

  const renderTitle = (title) => {
    return (
      <Container4>
        {title}
      </Container4>
    )
  }

  return (
    <Container0>
      {userInfo
        && publicMemeImg
        && allFollowing
        && allFollowers
        && allFollowingSelf ?
        <>
          <Container1>
            <Container2>
              <div>
                <Img0 alt="profile-img" src={userInfo.user_img}></Img0>
              </div>
              <div>
                <strong>{userInfo.user_name}</strong>
              </div>
              <Container3>
                {userInfo.self_intro}
              </Container3>
              {userData != null
                && Object.keys(userData).length > 0
                && userInfo.user_id !== userData.user_id
                && allFollowingSelf.includes(id) === false ?
                <Button0 onClick={() => followUser()}>追蹤</Button0>
                : ""}
              {userData != null
                && Object.keys(userData).length > 0
                && userInfo.user_id !== userData.user_id
                && allFollowingSelf.includes(id) === true ?
                <Button0 onClick={() => unfollowUser()}>取消追蹤</Button0>
                : ""}
            </Container2>
            <Container5 onClick={() => setStatus('allPublicMeme')}>
              <div>我的創作</div>
              <p><strong>{publicMemeImg.length}</strong></p>
            </Container5>
            <Container5 onClick={() => setStatus('followers')}>
              <div>粉絲</div>
              <p><strong>{allFollowers.length}</strong></p>
            </Container5>
            <Container5 onClick={() => setStatus('following')}>
              <div>追蹤中</div>
              <p><strong>{allFollowing.length}</strong></p>
            </Container5>
          </Container1>
          {status === 'followers' ? renderTitle('粉絲名單') : ""}
          {status === 'following' ? renderTitle('追蹤名單') : ""}
          {status === 'allPublicMeme' ? <AllPublicMemeImg memeImg={publicMemeImg} /> : ""}
          {status === 'followers' ? <AllFollowers allFollowers={allFollowers} allFollowingSelf={allFollowingSelf} /> : ""}
          {status === 'following' ? <AllFollowing allFollowing={allFollowing} allFollowingSelf={allFollowingSelf} /> : ""}
        </>
        : wholePageLoading('spinningBubbles', '#fff', 50, 50)}
    </Container0>
  )
}

export default Public;