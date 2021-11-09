import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { countClickTime } from '../../utlis/countClickTime';

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
  cursor: pointer;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
      <Container2 onClick={() => { clickMemeImg() }}>
        <Img0 src={img_url} alt={img_name}></Img0>
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

export default AllPublicMemeImg;