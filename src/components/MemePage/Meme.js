import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
    getUserInfo,
    getTheMemeImage,
} from '../../utlis/firebase';
import AddToFavorite from './AddToFavorite';
import Comments from './Comments';
import { wholePageLoading } from '../../utlis/loading';
import PageNotFound from '../404';

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #056;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
`;

const Container1 = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Container2 = styled.div`

`;

const Container3 = styled.div`
  background-color: #fff;
  padding: 30px;
  border-bottom: 5px solid #056;
`;

const Container4 = styled.div`
  border-bottom: 5px solid #ffc349;
  padding-bottom: 10px;
`;

const Container5 = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  min-height: 100px;
  white-space: pre-line;
`;

const Container6 = styled.span`
  background-color: #E0E0E0;
  border-radius: 10px;
  padding: 2px 5px;
`;

const Container7 = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Container8 = styled.div`
 width: 400px;
`;

const Img0 = styled.img`
  width: 400px;
  margin-right: 50px;
  position: sticky;
  top: 100px;
`;

const Link0 = styled(Link)`
  :hover{
      text-decoration: underline dotted;
  }
`;

function Meme() {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState();
    const [theMemeImage, setTheMemeImg] = useState({});

    useEffect(() => {
        getTheMemeImage(id, setTheMemeImg);
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
            last_save_time,
            img_url,
            img_name,
            tags,
            click_time,
            owner_user_id
        } = theMemeImage;

        const renderTags = (item) => {
            return (
                <span>
                    <Container6>#{item}</Container6>&ensp;
                </span>
            );
        }

        return (
            <Container1>
                <Container2>
                    <Img0 alt={img_name} src={img_url} />
                </Container2>
                <Container8>
                    <Container3>
                        <div><strong>標題：</strong>{title}</div>
                        <div><Link0 to={`/public/${owner_user_id}`}><strong>作者：</strong>{userInfo.user_name}</Link0></div>
                        <Container4><strong>發布日期：</strong>{new Date(last_save_time.toDate()).toLocaleString()}</Container4>
                        <Container5>{context}</Container5>
                        <div>{tags[0] !== "" ? tags.map((item) => renderTags(item)) : ""}</div>
                        <Container7>
                            <span><strong>瀏覽次數：</strong>{click_time}</span>
                            <AddToFavorite theMemeImage={theMemeImage} />
                        </Container7>
                    </Container3>
                    <Comments />
                </Container8>
            </Container1>
        )
    }

    return (
        <>
            {theMemeImage ?
                <Container0>
                    {Object.keys(theMemeImage).length > 0 && userInfo ? renderMemeInfo() : wholePageLoading('spinningBubbles', '#fff', 50, 50)}
                </Container0>
                : <PageNotFound />}
        </>

    );

}

export default Meme;