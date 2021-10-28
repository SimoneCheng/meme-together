import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import color from './Styled/colorTheme';

import robot from '../image/day27-my-robot.png';
import canvasStand from '../image/day10-canvas-stand.png';
import colorTools from '../image/gummy-color-tools.png';
import floppy from '../image/day18-floppy.png';

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 125px);
  background-color: ${props => props.color.color1.colorCode};
  padding-top: calc(30px + 65px);
  padding-bottom: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

const Container2 = styled.div`
    width: 300px;
    text-align: center;
    margin-left: 100px;
    @media screen and (max-width: 768px) {
      margin: auto;
    }
`;

const Container3 = styled.div`
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const Container4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
  padding-left: 50px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 20px;
  }
`;

const Container5 = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Container6 = styled.div`
    margin: 30px auto 0 auto;
    width: 80%;
`;

const Container7 = styled.div`
  background-color: ${props => props.color.color2.colorCode};
  height: 300px;
  padding-top: 30px;
  @media screen and (max-width: 768px) {
   text-align: center;
  }
`;

const Image1 = styled.img`
  height: 25rem;
  border-radius: 50px;
  animation: fadein 6s ease;
  @keyframes fadein {
    0% {opacity: 0;}
    50% {opacity: 1;}
  }
  @media screen and (max-width: 1024px) {
    height: 24rem;
  }
  @media screen and (max-width: 768px) {
    height: 20rem;
  }
`;

const Image2 = styled.img`
  width: 20rem;
  @media screen and (max-width: 1024px) {
    width: 15rem;
  }
  @media screen and (max-width: 425px) {
    width: 10rem;
  }
`;

const Title1 = styled.h1`
  width: 9em;
  border-right: 2px solid;
  overflow: hidden;
  animation: typing 6s;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 8s steps(9), caret 1s steps(1) infinite;
  animation-iteration-count: infinite;
  @keyframes typing {
    0% { width: 0 }
    50% { width: 9em }
  }
  @keyframes caret {
    50% { border-color: transparent; }
  }
`;

const Title2 = styled.h1`
  margin-left: 50px;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const Title3 = styled.h1`
  color: white;
  margin-left: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const Button1 = styled.button`
 border: none;
 border-radius: 5px;
 background-color: ${props => props.color.color2.colorCode};
 color: ${props => props.color.color3.colorCode};
 font-size: 16px;
 padding: 10px 30px;
 cursor: pointer;
 margin-top: 50px;
`;

const Text1 = styled.div`
    margin-top: 10px;
    font-size: 16px;
`;

const Strong = styled.strong`
  font-size: 20px;
  border-bottom: 2px ${props => props.color.color2.colorCode} solid;
  margin-left: 5px;
  transition: background-color 0.2s;
  :hover {
      background-color: ${props => props.color.color2.colorCode};
      color: white;
      cursor: pointer;
  }
`;

function Index() {
  return (
    <div>
      <Container1 color={color}>
        <Image1 alt='index-main-img' src={robot}></Image1>
        <Container2>
          <Title1>製作專屬於你的迷因</Title1>
          <Link to="/templates"><Button1 color={color}>開始使用</Button1></Link>
          <Text1>或是</Text1>
          <Text1>點選右上角<Strong color={color}>登入</Strong></Text1>
        </Container2>
      </Container1>
      <Container3>
        <Title2>玩轉迷因</Title2>
        <Container4>
          <Container5>
            <Image2 alt='info-img-1' src={canvasStand}></Image2>
            <div><Strong color={color}>選擇背景圖片</Strong></div>
            <Container6>提供許多迷因模板，幫你免去製作迷因時找不到圖片的煩惱</Container6>
          </Container5>
          <Container5>
            <Image2 alt='info-img-2' src={colorTools}></Image2>
            <div><Strong color={color}>揮灑創意</Strong></div>
            <Container6>打開編輯器，為迷因加上有趣好笑的時事梗，或是只有你和朋友才懂的笑點</Container6>
          </Container5>
          <Container5>
            <Image2 alt='info-img-3' src={floppy}></Image2>
            <div><Strong color={color}>下載迷因</Strong></div>
            <Container6>迷因製作完成後，支援PNG、JPG等圖片格式下載，將迷因保存在你的電腦當中</Container6>
          </Container5>
        </Container4>
      </Container3>
      <Container7 color={color}>
        <Title3>熱門創作</Title3>
      </Container7>
    </div>
  );
}

export default Index;