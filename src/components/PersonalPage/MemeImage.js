import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container0 = styled.div`
  text-align: center;
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

function MemeImage(props) {
  const memeImg = props.memeImg;

  const renderMemeImg = (item) => {
    const { title, img_url, img_name, created_time, last_save_time, isPublic } = item;
    return (
      <Container2>
        <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
        <div>
          {<p>
            標題：{title}
            <br></br>
            建立時間：
            <br></br>
            {new Date(created_time.toDate()).toLocaleString()}
            <br></br>
            上次儲存時間：
            <br></br>
            {new Date(last_save_time.toDate()).toLocaleString()}
            <br></br>
            是否公開發佈：{`${isPublic}`}
          </p>}
          <button>刪除</button>
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

export default MemeImage;