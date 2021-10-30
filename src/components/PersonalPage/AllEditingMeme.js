import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { deleteEditingMeme } from '../../utlis/firebase';

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

function AllEditingMeme(props) {
  const allEditingMeme = props.allEditingMeme;
  const userData = useSelector((state) => state.userData);

  const renderEditingMeme = (imgSrc, docId, createdTime, lastSaveTime) => {
    return (
      <Container2>
        <Link to={`/personal/meme-generator/${docId}`}><Img0 src={imgSrc} alt={docId}></Img0></Link>
        <div>
          <div>建立時間：{new Date(createdTime.toDate()).toLocaleString()}</div>
          <div>上次儲存時間：{new Date(lastSaveTime.toDate()).toLocaleString()}</div>
          <button onClick={() => { deleteEditingMeme(userData.user_id, docId).then(()=>alert('刪除成功！')) }}>刪除</button>
        </div>
      </Container2>
    );
  }

  return (
    <Container0>
      <Container1>
        {allEditingMeme ? allEditingMeme.map((item) => renderEditingMeme(item.data.backgroundImage_src, item.docId, item.data.created_time, item.data.last_save_time)) : ""}
      </Container1>
      <Link to="/templates"><button>新增創作</button></Link>
    </Container0>
  )
}

export default AllEditingMeme;
