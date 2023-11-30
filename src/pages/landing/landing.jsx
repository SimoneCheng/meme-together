import React from 'react';
import { Link } from 'react-router-dom';
// styles
import color from '@/components/Styled/colorTheme';
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
  Strong,
} from './landing.style';
// images
import robot from '@/image/day27-my-robot.png';
import canvasStand from '@/image/day10-canvas-stand.png';
import colorTools from '@/image/gummy-color-tools.png';
import floppy from '@/image/day18-floppy.png';
// components
import { AppFooter } from '@/features/layout/components';
import { HotMemes } from '@/features/meme-explorer/components';

function PrimarySection() {
  return (
    <section style={{ 'width': '100%', 'backgroundColor': '#ffc349' }}>
      <StyledSloganDiv color={color}>
        <SloganImg
          alt='index-main-img'
          src={robot}
        />
        <SloganText>
          <SloganTitle>
            製作專屬於你的迷因
          </SloganTitle>
          <Link to="/templates">
            <SloganButton color={color}>
              開始使用
            </SloganButton>
          </Link>
          <SloganContent>
            或是
          </SloganContent>
          <SloganContent>
            點選右上角
            <Strong color={color}>登入</Strong>
          </SloganContent>
        </SloganText>
      </StyledSloganDiv>
    </section>
  );
}

function SecondarySection() {
  return (
    <section style={{ 'width': '100%', 'backgroundColor': '#fff' }}>
      <StyledInfoDiv>
        <InfoTitle>
          玩轉迷因
        </InfoTitle>
        <InfoText>
          <InfoContent>
            <InfoImg
              alt='info-img-1'
              src={canvasStand}
            />
            <div>
              <Strong color={color}>選擇背景圖片</Strong>
            </div>
            <InfoSubContent>
              提供許多迷因模板，幫你免去製作迷因時找不到圖片的煩惱
            </InfoSubContent>
          </InfoContent>
          <InfoContent>
            <InfoImg alt='info-img-2' src={colorTools} />
            <div>
              <Strong color={color}>揮灑創意</Strong>
            </div>
            <InfoSubContent>
              打開編輯器，為迷因加上有趣好笑的時事梗，或是只有你和朋友才懂的笑點
            </InfoSubContent>
          </InfoContent>
          <InfoContent>
            <InfoImg alt='info-img-3' src={floppy} />
            <div>
              <Strong color={color}>下載迷因</Strong>
            </div>
            <InfoSubContent>
              迷因製作完成後，支援PNG、JPG等圖片格式下載，將迷因保存在你的電腦當中
            </InfoSubContent>
          </InfoContent>
        </InfoText>
      </StyledInfoDiv>
    </section>
  );
}

function Landing() {
  return (
    <Wrapper>
      <PrimarySection />
      <SecondarySection />
      <HotMemes />
      <AppFooter />
    </Wrapper>
  );
}

export default Landing;
