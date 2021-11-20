import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import 'animate.css';
import { setCanvas } from '../redux/actions';

const Container0 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Container2 = styled.div`
  font-size: 40px;
  font-family: 'Comic Sans MS';
  background-color: #056;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

const Container3 = styled.div`
  margin-top: 30px;
  font-size: 60px;
  @media screen and (max-width: 375px) {
    font-size: 40px;
  }
`;

const Link0 = styled(Link)`
  margin-top: 30px;
  background-color: #ffc349;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid black;
  }
`;

const Img0 = styled.img`
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
    <Container0>
      <Container1>
        <Container2 className="animate__hinge">
          Oops...
        </Container2>
        <Container3>
          此頁不存在！
        </Container3>
        <Link0 to='/'>點我回首頁</Link0>
      </Container1>
      <div>
        <Img0 alt='404' src={imgSrc} />
      </div>
    </Container0>
  );

}

export default PageNotFound;