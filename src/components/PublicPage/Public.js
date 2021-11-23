import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Img0,
  Button0
} from '../Styled/PublicPage/Public';
import AllFollowing from './AllFollowing';
import AllPublicMemeImg from './AllPublicMemeImg';
import AllFollowers from './AllFollowers';
import PageNotFound from '../404';

function Public() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [publicMemeImg, setPublicMemeImg] = useState();
  const [allFollowing, setAllFollowing] = useState();
  const [allFollowers, setAllFollowers] = useState();
  const [allFollowingSelf, setAllFollowingSelf] = useState([]);
  const [status, setStatus] = useState('allPublicMeme');
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const unsubscribe = getUserInfo(id, setUserInfo);
    return () => { unsubscribe() };
  }, [id])

  useEffect(() => {
    const unsubscribe = checkAllFollowers(id, setAllFollowers);
    return () => { unsubscribe() };
  }, [id]);

  useEffect(() => {
    const unsubscribe = checkAllFollowing(id, setAllFollowing);
    return () => { unsubscribe() };
  }, [id])

  useEffect(() => {
    const unsubscribe = getPublicMemeImg(id, setPublicMemeImg);
    return () => { unsubscribe() };
  }, [id])

  useEffect(() => {
    setStatus('allPublicMeme');
  }, [id])

  useEffect(() => {
    if (userData !== null && Object.keys(userData).length > 0) {
      checkAllFollowing(userData.user_id, setAllFollowingSelf);
    }
  }, [userData])

  const followUser = () => {
    const data = { user_id: userInfo.user_id };
    const selfData = { user_id: userData.user_id };
    addFollowing(userData.user_id, userInfo.user_id, data)
      .then(() => addFollower(userInfo.user_id, userData.user_id, selfData))
      .then(() => alertSuccess('追蹤成功！'));
  }

  const unfollowUser = () => {
    unfollowing(userData.user_id, userInfo.user_id)
      .then(() => deleteFollower(userInfo.user_id, userData.user_id))
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
    <>
      {userInfo ?
        <Container0>
          {Object.keys(userInfo).length > 0
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
                  <div>創作</div>
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
        : <PageNotFound />}
    </>
  )
}

export default Public;