import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  Container7,
  Img0,
  Link0
} from '../Styled/MemePage/Meme';
import {
  getUserInfo,
  getTheMemeImage,
} from '../../utlis/firebase';
import { wholePageLoading } from '../../utlis/loading';
import AddToFavorite from './AddToFavorite';
import Comments from './Comments';
import PageNotFound from '../404';

function Meme() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [theMemeImage, setTheMemeImg] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <Container5>#{item}</Container5>&ensp;
        </span>
      );
    }

    return (
      <Container1>
        <div>
          <Img0 alt={img_name} src={img_url} />
        </div>
        <Container7>
          <Container2>
            <div><strong>標題：</strong>{title}</div>
            <div><Link0 to={`/public/${owner_user_id}`}><strong>作者：</strong>{userInfo.user_name}</Link0></div>
            <Container3><strong>發布日期：</strong>{new Date(last_save_time.toDate()).toLocaleString()}</Container3>
            <Container4>{context}</Container4>
            <div>{tags[0] !== "" ? tags.map((item) => renderTags(item)) : ""}</div>
            <Container6>
              <span><strong>瀏覽次數：</strong>{click_time}</span>
              <AddToFavorite theMemeImage={theMemeImage} />
            </Container6>
          </Container2>
          <Comments />
        </Container7>
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