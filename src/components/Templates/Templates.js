import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import color from '../Styled/colorTheme';
import { getAllTemplates } from '../../utlis/firebase';
import { loading } from '../../utlis/loading'

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color1.colorCode};
  color: black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px)
`;

const Container0 = styled.div`
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin: 45px;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 524px) {
    grid-template-columns: repeat(1, 250px);
  }
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 15px;
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  @media screen and (max-width: 660px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 524px) {
    width: 250px;
    height: 250px;
  }
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Templates() {
  const { url } = useRouteMatch();
  const [allTemplates, setAllTemplates] = useState();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTemplates(setAllTemplates);
  }, [])

  const clickTheTemplate = (imgId) => {
    history.push(`${url}/${imgId}`)
  }

  const renderAllTemplates = (imgURL, imgId) => {
    return (
      <Container2 key={imgId} onClick={() => clickTheTemplate(imgId)}>
        <Img0 src={imgURL} id={imgId} alt={`template-${imgId}`}></Img0>
      </Container2>
    );
  }

  return (
    <Container0>
      <H1><Strong color={color}>選擇模板</Strong></H1>
      {allTemplates ?
        <Container1>
          {allTemplates.map((item) => {
            const { image_url, image_id } = item;
            return renderAllTemplates(image_url, image_id);
          })}
        </Container1>
        : <Container>{loading('spinningBubbles', '#056', 50, 50)}</Container>}
    </Container0>
  )
}

export default Templates;