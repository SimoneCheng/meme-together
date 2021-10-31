import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import AllEditingMeme from './AllEditingMeme';
import MemeImage from './MemeImage';
import {
    getUserInfo,
    getAllEditingMeme,
    getPrivateMemeImg,
    getPublicMemeImg
} from '../../utlis/firebase';

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
  padding-bottom: 5px;
  cursor: pointer;
  border-bottom: ${props => props.status === 'editing' ? "4px solid black" : "none"};
  transition: border-width 0.3s linear;
`;

const Container3 = styled.div`
   margin-right: 20px;
  margin-top: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  border-bottom: ${props => props.status === 'nopublic' ? "4px solid black" : "none"};
  transition: border-width 0.3s linear;
`;

const Container4 = styled.div`
  margin-right: 20px;
  margin-top: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  border-bottom: ${props => props.status === 'ispublic' ? "4px solid black" : "none"};
  transition: border-width 0.3s linear;
`;

const Container5 = styled.div`
  margin-right: 20px;
  margin-top: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  border-bottom: ${props => props.status === 'favorite' ? "4px solid black" : "none"};
  transition: border-width 0.3s linear;
`;

function Personal() {
    const history = useHistory();
    const userData = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState();
    const [status, setStatus] = useState('editing');
    const [allEditingMeme, setAllEditingMeme] = useState([]);
    const [privateMemeImg, setPrivateMemeImg] = useState([]);
    const [publicMemeImg, setPublicMemeImg] = useState([]);

    useEffect(() => {
        if (userData === null) {
            history.push('/');
        }
        if (userData != null && Object.keys(userData).length > 0) {
            getUserInfo(userData.user_id, setUserInfo)
            getAllEditingMeme(userData.user_id, setAllEditingMeme);
            getPublicMemeImg(userData.user_id, setPublicMemeImg);
            getPrivateMemeImg(userData.user_id, setPrivateMemeImg);
        }
    }, [userData])

    const clickStatusButton = (status) => {
        setStatus(status);
    }

    return (
        <>
            <Container0>
                <Container1>
                    <Container2>
                        {userInfo ? <Img0 alt="profile-img" src={userInfo.user_img}></Img0> : ""}
                    </Container2>
                    <Container2>
                        {userInfo ? <p>使用者ID：{userInfo.user_id}</p> : ""}
                        {userInfo ? <p>暱稱：{userInfo.user_name}</p> : ""}
                        {userInfo ? <p>電子信箱：{userInfo.user_email}</p> : ""}
                        {userInfo ? <p>創建時間：{userInfo.created_time}</p> : ""}
                    </Container2>
                    <Container2>
                        {userData ? <Link to={`/public/${userData.user_id}`}><button>前往個人公開頁面</button></Link> : ""}
                    </Container2>
                </Container1>
                <Container1>
                    <Container2 status={status} onClick={() => { clickStatusButton('editing') }}>
                        <span>創作中</span>
                        <span>({allEditingMeme.length})</span>
                    </Container2>
                    <Container3 status={status} onClick={() => { clickStatusButton('nopublic') }}>
                        <span>已完成，未發布</span>
                        <span>({privateMemeImg.length})</span>
                    </Container3>
                    <Container4 status={status} onClick={() => { clickStatusButton('ispublic') }}>
                        <span>已發布</span>
                        <span>({publicMemeImg.length})</span>
                    </Container4>
                    <Container5 status={status} onClick={() => { clickStatusButton('favorite') }}>
                        <span>收藏</span>
                        <span>(0)</span>
                    </Container5>
                </Container1>
            </Container0>
            {status === 'editing' ? <AllEditingMeme allEditingMeme={allEditingMeme} /> : ""}
            {status === 'nopublic' ? <MemeImage memeImg={privateMemeImg} /> : ""}
            {status === 'ispublic' ? <MemeImage memeImg={publicMemeImg} /> : ""}
        </>
    )
}

export default Personal;