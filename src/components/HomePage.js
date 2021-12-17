import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getCampaignMeme } from '../utlis/firebase';
import { countClickTime } from '../utlis/countClickTime';
import { loading } from '../utlis/loading';
import color from './Styled/colorTheme';
import {
  Wrapper,
  StyledSloganDiv,
  SloganText,
  SloganImg,
  SloganTitle,
  SloganContent,
  SloganButton,
  StyledInfoDiv,
  InfoTitle,
  InfoText,
  InfoContent,
  InfoImg,
  InfoSubContent,
  StyledHotMemesDiv,
  HotMemesTitle,
  AllHotMemesImg,
  LinkToMoreMemes,
  EachMemeDiv,
  EachMemeImg,
  Strong, 
} from './Styled/HomePage';

import robot from '../image/day27-my-robot.png';
import canvasStand from '../image/day10-canvas-stand.png';
import colorTools from '../image/gummy-color-tools.png';
import floppy from '../image/day18-floppy.png';
import Footer from './Footer';

function Index() {
  const [camapignMeme, setCampaignMeme] = useState();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    getCampaignMeme().then((res) => setCampaignMeme(res));
  }, [])

  const renderCampaignMeme = (item) => {
    const { img_url, img_name } = item;
    const clickMemeImg = () => {
      countClickTime(img_name)
        .then(() => history.push(`/meme/${img_name}`));
    };
    return (
      <EachMemeDiv key={img_name} onClick={() => clickMemeImg()}>
        <EachMemeImg src={img_url} alt={img_name} />
      </EachMemeDiv>
    );
  }

  return (
    <Wrapper>
      <div style={{ 'width': '100%', 'backgroundColor': '#ffc349' }}>
        <StyledSloganDiv color={color}>
          <SloganImg alt='index-main-img' src={robot}></SloganImg>
          <SloganText>
            <SloganTitle>製作專屬於你的迷因</SloganTitle>
            <Link to="/templates"><SloganButton color={color}>開始使用</SloganButton></Link>
            <SloganContent>或是</SloganContent>
            <SloganContent>點選右上角<Strong color={color}>登入</Strong></SloganContent>
          </SloganText>
        </StyledSloganDiv>
      </div>
      <div style={{ 'width': '100%', 'backgroundColor': '#fff' }}>
        <StyledInfoDiv>
          <InfoTitle>玩轉迷因</InfoTitle>
          <InfoText>
            <InfoContent>
              <InfoImg alt='info-img-1' src={canvasStand}></InfoImg>
              <div><Strong color={color}>選擇背景圖片</Strong></div>
              <InfoSubContent>提供許多迷因模板，幫你免去製作迷因時找不到圖片的煩惱</InfoSubContent>
            </InfoContent>
            <InfoContent>
              <InfoImg alt='info-img-2' src={colorTools}></InfoImg>
              <div><Strong color={color}>揮灑創意</Strong></div>
              <InfoSubContent>打開編輯器，為迷因加上有趣好笑的時事梗，或是只有你和朋友才懂的笑點</InfoSubContent>
            </InfoContent>
            <InfoContent>
              <InfoImg alt='info-img-3' src={floppy}></InfoImg>
              <div><Strong color={color}>下載迷因</Strong></div>
              <InfoSubContent>迷因製作完成後，支援PNG、JPG等圖片格式下載，將迷因保存在你的電腦當中</InfoSubContent>
            </InfoContent>
          </InfoText>
        </StyledInfoDiv>
      </div>
      <div style={{ 'width': '100%', 'backgroundColor': '#056' }}>
        <StyledHotMemesDiv color={color}>
          <HotMemesTitle>熱門創作</HotMemesTitle>
          <AllHotMemesImg>
            {camapignMeme ? camapignMeme.map((item) => renderCampaignMeme(item)) : loading('spinningBubbles', '#fff', 50, 50)}
          </AllHotMemesImg>
          <Link to="/explorememes"><LinkToMoreMemes>查看更多</LinkToMoreMemes></Link>
        </StyledHotMemesDiv>
      </div>
      <Footer />
    </Wrapper>
  );
}

export default Index;