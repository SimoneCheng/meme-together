import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { countClickTime } from '../../utlis/countClickTime';

const Container = styled.div`
  color: #fff;
  font-size: 40px;
  padding-top: 100px;
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 50px;
  justify-content: center;
  align-items: flex-start;
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  cursor: pointer;
  &:hover{
    box-shadow: 2px 2px 15px grey;
  }
`;

const Img0 = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
`;

function AllPublicMemeImg(props) {
  const memeImg = props.memeImg;
  const history = useHistory();

  const renderMemeImg = (item) => {
    const { img_url, img_name } = item;
    const clickMemeImg = () => {
      countClickTime(img_name)
        .then(() => history.push(`/meme/${img_name}`));
    };
    return (
      <Container2 key={img_name} onClick={() => { clickMemeImg() }}>
        <Img0 src={img_url} alt={img_name}></Img0>
      </Container2>
    );
  }

  const renderAllMemeImg = () => {
    return(
      <Container1>
        {memeImg.map((item) => renderMemeImg(item))}
      </Container1>
    )
  }

  const renderNone = () => {
    return(
      <Container>
        目前沒有創作喔～
      </Container>
    )
  }

  return (
    <div>
        {memeImg.length > 0 ? renderAllMemeImg() : renderNone()}
    </div>
  )

};

export default AllPublicMemeImg;