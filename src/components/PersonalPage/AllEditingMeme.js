import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import color from '../Styled/colorTheme';
import { deleteEditingMeme } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  overflow: hidden;
  width: 250px;
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
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 430px;
`;

const Container6 = styled.div`
  border-radius: 50%;
  border: 2px solid #056;
  font-size: 70px;
  color: #056;
  width: 60px;
  height: 60px;
  position: relative;
`;

const Container7 = styled.span`
  position: absolute;
  top: -23px;
  left: 4px;
  color: #056;
`;

const Container8 = styled.div`
  padding-top: 20px;
`;

const Container9 = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
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
          <Container6>
            <Link to="/templates">
              <Container7>+</Container7>
            </Link>
          </Container6>
          <Container8>
            <Link to="/templates" style={{ 'color': '#056' }}>新增創作</Link>
          </Container8>
        </Container5>
      </Container1>
    )
  }

  const renderNone = () => {
    return (
      <Container9>
        空空的喔～
      </Container9>
    );
  }

  return (
    <div>
      {allEditingMeme.length > 0 ? renderAllEditingMeme() : renderNone()}
    </div>
  )
}

export default AllEditingMeme;
