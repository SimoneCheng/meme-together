import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { wholePageLoading } from '../../utlis/loading';
import {
    getUserInfo,
    getAllEditingMeme,
    getPrivateMemeImg,
    getPublicMemeImg,
    getAllFavorite
} from '../../utlis/firebase';
import {
    Img0,
    Container0,
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6,
    Container7,
    Container8,
    Container9,
    Button0
} from '../Styled/PersonalPage/Personal';
import AllEditingMeme from './AllEditingMeme';
import AllMemeImage from './AllMemeImage';
import AllFavorite from './AllFavorite';

function Personal() {
    const history = useHistory();
    const userData = useSelector((state) => state.userData);
    const [userInfo, setUserInfo] = useState();
    const [status, setStatus] = useState('editing');
    const [allEditingMeme, setAllEditingMeme] = useState();
    const [privateMemeImg, setPrivateMemeImg] = useState();
    const [publicMemeImg, setPublicMemeImg] = useState();
    const [allFavorite, setAllFavorite] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
      
    useEffect(() => {
        if (userData === null) {
            history.push('/');
        }
        if (userData != null && Object.keys(userData).length > 0) {
            getUserInfo(userData.user_id, setUserInfo)
            getAllEditingMeme(userData.user_id, setAllEditingMeme);
            getPublicMemeImg(userData.user_id, setPublicMemeImg);
            getPrivateMemeImg(userData.user_id, setPrivateMemeImg);
            getAllFavorite(userData.user_id, setAllFavorite);
        }
    }, [userData])

    const clickStatusButton = (status) => {
        setStatus(status);
    }

    return (
        <Container0>
            {userData != null
                && Object.keys(userData).length > 0
                && userInfo
                && allEditingMeme
                && privateMemeImg
                && publicMemeImg
                && allFavorite ?
                <>
                    <Container1>
                        <Container2>
                            <Img0 alt="profile-img" src={userInfo.user_img}></Img0>
                        </Container2>
                        <Container2>
                            <div style={{ 'paddingBottom': '10px' }}><strong>暱稱：</strong>{userInfo.user_name}</div>
                            <Container9><strong>電子信箱：</strong>{userInfo.user_email}</Container9>
                        </Container2>
                        <Container2>
                            <Link to={`/public/${userData.user_id}`}><Button0>前往個人公開頁面</Button0></Link>
                        </Container2>
                    </Container1>
                    <Container8>
                        <Container7>
                            <Container3 status={status} onClick={() => { clickStatusButton('editing') }}>
                                <span> 創作中 </span>
                                <span>({allEditingMeme.length})</span>
                            </Container3>
                            <Container4 status={status} onClick={() => { clickStatusButton('nopublic') }}>
                                <span> 已完成，未發布 </span>
                                <span>({privateMemeImg.length})</span>
                            </Container4>
                            <Container5 status={status} onClick={() => { clickStatusButton('ispublic') }}>
                                <span> 已發布 </span>
                                <span>({publicMemeImg.length})</span>
                            </Container5>
                            <Container6 status={status} onClick={() => { clickStatusButton('favorites') }}>
                                <span> 收藏 </span>
                                <span>({allFavorite.length})</span>
                            </Container6>
                        </Container7>
                        {status === 'editing' ? <AllEditingMeme allEditingMeme={allEditingMeme} /> : ""}
                        {status === 'nopublic' ? <AllMemeImage memeImg={privateMemeImg} /> : ""}
                        {status === 'ispublic' ? <AllMemeImage memeImg={publicMemeImg} /> : ""}
                        {status === 'favorites' ? <AllFavorite allFavorite={allFavorite} /> : ""}
                    </Container8>
                </>
                : wholePageLoading('spinningBubbles', '#056', 50, 50)}
        </Container0>
    )
}

export default Personal;