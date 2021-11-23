import React from 'react';
import { Link } from 'react-router-dom';

import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container6,
  Img0,
  Button0
} from '../Styled/PersonalPage/Common';
import {
  deleteMemeImgInDb,
  deleteMemeImgInStorage,
  changeMemePublicStatus
} from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

function AllMemeImage(props) {
  const memeImg = props.memeImg;

  const deleteImg = (docId) => {
    deleteMemeImgInDb(docId)
      .then(() => {
        deleteMemeImgInStorage(docId)
          .then(() => alertSuccess('成功刪除！'))
      })
  }

  const clickPublicStatus = (img_name, boolean) => {
    changeMemePublicStatus(img_name, { isPublic: boolean, last_save_time: new Date() })
      .then(() => {
        boolean ? alertSuccess('成功公開發布！') : alertSuccess('已取消發布！');
      });
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
      <Container1 key={img_name}>
        <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
        <Container2>
          <Container3><strong>標題：</strong></Container3>
          <Container3>{title}</Container3>
          <Container3><strong>建立時間：</strong></Container3>
          <Container3>{new Date(created_time.toDate()).toLocaleString()}</Container3>
          <Container3><strong>上次儲存時間：</strong></Container3>
          <Container3>{new Date(last_save_time.toDate()).toLocaleString()}</Container3>
          <div style={{ 'marginTop': '10px' }}>
            {isPublic ? <Button0 color={color} onClick={() => clickPublicStatus(img_name, false)}>取消公開發布</Button0> : <Button0 color={color} onClick={() => clickPublicStatus(img_name, true)}>公開發布</Button0>}
          </div>
          <div>
            下載圖片：
            <Button0 color={color} onClick={() => clickDownloadImage(img_url, "jpg")}>jpg</Button0>
            <Button0 style={{ 'marginLeft': '10px' }} color={color} onClick={() => clickDownloadImage(img_url, "png")}>png</Button0>
          </div>
          <div>
            <Button0 color={color} onClick={() => deleteImg(img_name)}>刪除</Button0>
          </div>
        </Container2>
      </Container1>
    );
  }

  const renderAllMemeImg = () => {
    return (
      <Container0>
        {memeImg.map((item) => renderMemeImg(item))}
      </Container0>
    )
  }

  const renderNone = () => {
    return (
      <Container6>
        空空的喔～
      </Container6>
    );
  }

  return (
    <>
      {memeImg.length > 0 ? renderAllMemeImg() : renderNone()}
    </>
  )
};

export default AllMemeImage;