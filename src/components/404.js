import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import 'animate.css';
import { setCanvas } from '../redux/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const WarningMessage = styled.div`
  font-size: 40px;
  font-family: 'Comic Sans MS';
  background-color: #056;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

const GobackToHomepageText = styled.div`
  margin-top: 30px;
  font-size: 60px;
  @media screen and (max-width: 375px) {
    font-size: 40px;
  }
`;

const LinkToHomepage = styled(Link)`
  margin-top: 30px;
  background-color: #ffc349;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid black;
  }
`;

const Img404 = styled.img`
  width: 100%;
`;

function PageNotFound() {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);
  const imgSrc = "https://firebasestorage.googleapis.com/v0/b/meme-together.appspot.com/o/404image.jpeg?alt=media&token=9540dd77-03cd-4ea9-9931-086e29cc338d";
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (canvas === null) {
      dispatch(setCanvas(''));
    }
  }, [])

  return (
    <Wrapper>
      <StyledText>
        <WarningMessage className="animate__hinge">
          Oops...
        </WarningMessage>
        <GobackToHomepageText>
          此頁不存在！
        </GobackToHomepageText>
        <LinkToHomepage to='/'>點我回首頁</LinkToHomepage>
      </StyledText>
      <div>
        <Img404 alt='404' src={imgSrc} />
      </div>
    </Wrapper>
  );

}

export default PageNotFound;