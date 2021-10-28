import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getUserInfo } from '../../utlis/firebase';
import AllEditingMeme from './AllEditingMeme';

const Img0 = styled.img`
  width: 100px;
`;

const Container0 = styled.div`
  padding-top: 100px;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container2 = styled.div`
  margin-right: 20px;
  margin-top: 20px;
`;

function Personal() {
    const history = useHistory();
    const userData = useSelector((state) => state.userData);
    const allEditingMeme = useSelector((state) => state.allEditingMeme);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (userData === null) {
            history.push('/');
        } else {
            getUserInfo(userData.user_id).then((res) => {
                setUserInfo(res);
            });
        }
    }, [userData])

    return (
        <>
            <Container0>
                <Container1>
                    <Container2>
                        {userInfo ? <Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
                    </Container2>
                    <Container2>
                        {userInfo ? <p>userID：{userInfo.user_id}</p> : ""}
                        {userInfo ? <p>userName：{userInfo.user_name}</p> : ""}
                        {userInfo ? <p>userEmail：{userInfo.user_email}</p> : ""}
                        {userInfo ? <p>createdTime：{userInfo.created_time}</p> : ""}
                    </Container2>
                    <Container2>
                        {userData ? <Link to={`/public/${userData.user_id}`}><button>前往個人公開頁面</button></Link> : ""}
                    </Container2>
                </Container1>
                <Container1>
                    <Container2>
                        <Link to="/personal">創作中</Link>
                        <span>({allEditingMeme.length})</span>
                    </Container2>
                    <Container2>
                        <Link to="/personal?status=completed">已完成</Link>
                        <span>(0)</span>
                    </Container2>
                    <Container2>
                        <Link to="/personal?status=published">已發布</Link>
                        <span>(0)</span>
                    </Container2>
                    <Container2>
                        <Link to="/personal?status=favorite">收藏</Link>
                        <span>(0)</span>
                    </Container2>
                </Container1>
            </Container0>
            <AllEditingMeme />
        </>
    )
}

export default Personal;