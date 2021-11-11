import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import color from '../Styled/colorTheme';
import {
  deleteMemeImgInDb,
  deleteMemeImgInStorage,
  changeMemePublicStatus
} from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;;
  justify-content: center;
  align-items: flex-start;
  min-height: 570px;
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
  }
`;

const Container3 = styled.div`
 padding: 0 20px 20px 20px;
`;

const Container4 = styled.div`
 margin-top: 5px;
`;

const Container5 = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
`;

const Container6 = styled.div`
  padding: 5px 0 0 5px;
  &:hover{
    padding: 0 0 0 0;
  }
`;

const Img0 = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

const Button = styled.button`
  margin-top: 10px;
  border: 1px ${props => props.color.color2.colorCode} solid;
  border-radius: 5px;
  color: ${props => props.color.color2.colorCode};
  font-size: 1rem;
  background-color: ${props => props.color.color3.colorCode};
  padding: 5px 10px;
  cursor: pointer;
  :hover {
    background-color: ${props => props.color.color2.colorCode};
    color: ${props => props.color.color3.colorCode};
  } 
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
      <Container6 key={img_name}>
        <Container2>
          <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
          <Container3>
            <Container4><strong>標題：</strong></Container4>
            <Container4>{title}</Container4>
            <Container4><strong>建立時間：</strong></Container4>
            <Container4>{new Date(created_time.toDate()).toLocaleString()}</Container4>
            <Container4><strong>上次儲存時間：</strong></Container4>
            <Container4>{new Date(last_save_time.toDate()).toLocaleString()}</Container4>
            <div style={{ 'marginTop': '10px' }}>
              {isPublic ? <Button color={color} onClick={() => clickPublicStatus(img_name, false)}>取消公開發布</Button> : <Button color={color} onClick={() => clickPublicStatus(img_name, true)}>公開發布</Button>}
            </div>
            <div>
              下載圖片：
              <Button color={color} onClick={() => clickDownloadImage(img_url, "jpg")}>jpg</Button>
              <Button style={{ 'marginLeft': '10px' }} color={color} onClick={() => clickDownloadImage(img_url, "png")}>png</Button>
            </div>
            <div>
              <Button color={color} onClick={() => deleteImg(img_name)}>刪除</Button>
            </div>
          </Container3>
        </Container2>
      </Container6>
    );
  }

  const renderAllMemeImg = () => {
    return (
      <Container1>
        {memeImg.map((item) => renderMemeImg(item))}
      </Container1>
    )
  }

  const renderNone = () => {
    return (
      <Container5>
        空空的喔～
      </Container5>
    );
  }

  return (
    <div>
      {memeImg.length > 0 ? renderAllMemeImg() : renderNone()}
    </div>
  )

};

export default AllMemeImage;