import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
    getUserInfo,
    getTheMemeImage,
} from '../../utlis/firebase';
import AddToFavorite from './AddToFavorite';
import Comments from './Comments';

const Container0 = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin: auto;
  width: 400px;
`;

const Container2 = styled.div`
  width: 400px;
`;

const Img0 = styled.img`
  width: 400px;
`;

function Meme() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [theMemeImage, setTheMemeImg] = useState();

    useEffect(() => {
        getTheMemeImage(id, setTheMemeImg)
    }, [])

    useEffect(() => {
        if (theMemeImage) {
            getUserInfo(theMemeImage.owner_user_id, setUserInfo);
        }
    }, [theMemeImage])

    const renderMemeInfo = () => {
        const {
            title,
            context,
            created_time,
            last_save_time,
            img_url,
            img_name,
            tags,
        } = theMemeImage;

        const renderTags = (item) => {
            return (
                <span>
                    #{item}
                </span>
            )
        }

        return (
            <Container1>
                <Container2>
                    <Img0 alt={img_name} src={img_url} />
                </Container2>
                <div>
                    <div>標題：{title}</div>
                    <div>{context}</div>
                    <div>作者：{userInfo.user_name}</div>
                    <div>tags：{tags.map((item) => renderTags(item))}</div>
                    <div>建立日期：{new Date(created_time.toDate()).toLocaleString()}</div>
                    <div>最新發布日期：{new Date(last_save_time.toDate()).toLocaleString()}</div>
                    <AddToFavorite theMemeImage={theMemeImage} />
                </div>
            </Container1>
        )
    }

    return (
        <Container0>
            {theMemeImage && userInfo ? renderMemeInfo() : ""}
            <Comments />
        </Container0>
    );

}

export default Meme;