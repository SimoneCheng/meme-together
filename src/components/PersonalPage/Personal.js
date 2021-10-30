import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import AllEditingMeme from './AllEditingMeme';
import MemeImage from './MemeImage';
import { 
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
`;

function Personal() {
    const history = useHistory();
    const userData = useSelector((state) => state.userData);
    const userInfo = useSelector((state) => state.userInfo);
    const [allEditingMeme, setAllEditingMeme] = useState([]);
    const [privateMemeImg, setPrivateMemeImg] = useState([]);
    const [publicMemeImg, setPublicMemeImg] = useState([]);
    
    useEffect(() => {
        if (userData === null) {
            history.push('/');
        }
    }, [userData])

    useEffect(() => {
        if (userData != null && Object.keys(userData).length > 0) {
            getAllEditingMeme(userData.user_id, setAllEditingMeme);
            getPublicMemeImg(userData.user_id, setPublicMemeImg);
            getPrivateMemeImg(userData.user_id, setPrivateMemeImg);
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
                    <Container2>
                        <span>創作中</span>
                        <span>({allEditingMeme.length})</span>
                    </Container2>
                    <Container2>
                        <span>已完成，未發佈</span>
                        <span>({privateMemeImg.length})</span>
                    </Container2>
                    <Container2>
                        <span>已發布</span>
                        <span>({publicMemeImg.length})</span>
                    </Container2>
                    <Container2>
                        <span>收藏</span>
                        <span>(0)</span>
                    </Container2>
                </Container1>
            </Container0>
            <AllEditingMeme allEditingMeme={allEditingMeme} />
            <hr></hr>
            <MemeImage memeImg={privateMemeImg} />
            <hr></hr>
            <MemeImage memeImg={publicMemeImg} />
        </>
    )
}

export default Personal;