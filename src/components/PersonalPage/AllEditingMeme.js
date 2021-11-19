import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import styled from 'styled-components';

import color from '../Styled/colorTheme';
import { deleteEditingMeme } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;
  @media screen and (max-width: 970px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 680px) {
    grid-template-columns: repeat(1, 400px);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 350px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 300px);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 250px);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 200px);
  }
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
`;

const Container3 = styled.div`
 padding: 0 20px 20px 20px;
`;

const Container4 = styled.div`
 margin-top: 5px;
`;

const Container5 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Container6 = styled.span`
  font-size: 70px;
  color: #056;
`;

const Container7 = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
  @media screen and (max-width: 810px) {
    width: 100%;
  }
`;

const Img0 = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Button = styled.button`
  margin-top: 20px;
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

function AllEditingMeme(props) {
  const allEditingMeme = props.allEditingMeme;
  const userData = useSelector((state) => state.userData);

  const renderEditingMeme = (imgSrc, docId, createdTime, lastSaveTime) => {
    return (
      <Container2 key={docId}>
        <Link to={`/personal/meme-generator/${docId}`}><Img0 src={imgSrc} alt={docId}></Img0></Link>
        <Container3>
          <Container4><strong>建立時間：</strong></Container4>
          <Container4>{new Date(createdTime.toDate()).toLocaleString()}</Container4>
          <Container4><strong>上次儲存時間：</strong></Container4>
          <Container4>{new Date(lastSaveTime.toDate()).toLocaleString()}</Container4>
          <Button color={color} onClick={() => { deleteEditingMeme(userData.user_id, docId).then(() => alertSuccess('刪除成功！')) }}>刪除</Button>
        </Container3>
      </Container2>
    );
  }

  const renderAllEditingMeme = () => {
    return (
      <Container1>
        {allEditingMeme ? allEditingMeme.map((item) => renderEditingMeme(item.data.backgroundImage_src, item.docId, item.data.created_time, item.data.last_save_time)) : ""}
        <Container5>
          <Link to="/templates">
            <Container6><MdAddCircleOutline /></Container6>
          </Link>
          <div>
            <Link to="/templates" style={{ 'color': '#056' }}>新增創作</Link>
          </div>
        </Container5>
      </Container1>
    )
  }

  const renderNone = () => {
    return (
      <Container7>
        空空的喔～
      </Container7>
    );
  }

  return (
    <div>
      {allEditingMeme.length > 0 ? renderAllEditingMeme() : renderNone()}
    </div>
  )
}

export default AllEditingMeme;
