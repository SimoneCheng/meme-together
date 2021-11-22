import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { countClickTime } from '../../utlis/countClickTime';

const Container = styled.div`
  color: #fff;
  font-size: 2rem;
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 50px 50px 0 50px;
  padding-bottom: 50px;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(3, 220px);
    grid-gap: 20px;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 150px);
  }
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px white;
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  &:hover{
    box-shadow: 0 0 10px 3px white;
  }
  @media screen and (max-width: 850px) {
    height: 220px;
  }
  @media screen and (max-width: 760px) {
    height: 200px;
  }
  @media screen and (max-width: 700px) {
    height: 250px;
  }
  @media screen and (max-width: 600px) {
    height: 200px;
  }
  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
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
    return (
      <Container1>
        {memeImg.map((item) => renderMemeImg(item))}
      </Container1>
    )
  }

  const renderNone = () => {
    return (
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