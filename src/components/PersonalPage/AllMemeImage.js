import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  deleteMemeImgInDb,
  deleteMemeImgInStorage,
  changeMemePublicStatus
} from '../../utlis/firebase';

const Container0 = styled.div`

`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 16px;
  margin: 50px;
  justify-content: center;
  align-items: flex-start;
`;

const Container2 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function AllMemeImage(props) {
  const memeImg = props.memeImg;

  const deleteImg = (docId) => {
    deleteMemeImgInDb(docId)
      .then(() => {
        deleteMemeImgInStorage(docId)
          .then(() => alert('成功刪除！'))
      })
  }

  const clickPublicStatus = (img_name, boolean) => {
    changeMemePublicStatus(img_name, { isPublic: boolean, last_save_time: new Date() });
  }

  const clickDownloadImage = (img_url, imageFormat) => {
    fetch(img_url)
    .then(res => res.blob())
    .then(blob => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `meme-generator-${new Date().getTime()}.${imageFormat}`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  const renderMemeImg = (item) => {
    const { title, img_url, img_name, created_time, last_save_time, isPublic } = item;

    return (
      <Container2>
        <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
        <div>
          <div>標題：{title}</div>
          <div>建立時間：{new Date(created_time.toDate()).toLocaleString()}</div>
          <div>上次儲存時間：{new Date(last_save_time.toDate()).toLocaleString()}</div>
          <div>
            {isPublic ? <button onClick={() => clickPublicStatus(img_name, false)}>取消公開發布</button> : <button onClick={() => clickPublicStatus(img_name, true)}>公開發布</button>}
          </div>
          <div>
            <button onClick={() => clickDownloadImage(img_url, "jpg")}>下載圖片（jpg）</button>
          </div>
          <div>
            <button onClick={() => clickDownloadImage(img_url, "png")}>下載圖片（png）</button>
          </div>
          <div>
            <button onClick={() => deleteImg(img_name)}>刪除</button>
          </div>
        </div>
      </Container2>
    );
  }

  return (
    <Container0>
      <Container1>
        {memeImg ? memeImg.map((item) => renderMemeImg(item)) : ""}
      </Container1>
    </Container0>
  )

};

export default AllMemeImage;