import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';

import color from '../Styled/colorTheme';
import { getAllTemplates } from '../../utlis/firebase';

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color4.colorCode};
  color: black;
`;

const Container0 = styled.div`
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: repeat(2, 250px);
  grid-gap: 16px;
  margin: 50px;
  justify-content: center;
  align-items: stretch; 
`;

const Container2 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 250px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Templates() {
  const { url } = useRouteMatch();
  const [allTemplates, setAllTemplates] = useState([]);

  useEffect(() => {
      getAllTemplates(setAllTemplates);
    }, [])

  const renderAllTemplates = (imgURL, imgId) => {
    return (
      <Container2>
        <Link to={`${url}/${imgId}`}>
          <Img0 src={imgURL} id={imgId} alt={`template-${imgId}`}></Img0>
        </Link>
      </Container2>
    );
  }

  return (
      <Container0>
        <H1><Strong color={color}>選擇模板</Strong></H1>
        <Container1>
          {allTemplates.map((item) => {
            const { image_url, image_id } = item;
            return renderAllTemplates(image_url, image_id);
          })}
        </Container1>
      </Container0>
  )
}

export default Templates;