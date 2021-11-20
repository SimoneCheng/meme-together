import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getCampaignMeme } from '../utlis/firebase';
import { countClickTime } from '../utlis/countClickTime';
import { loading } from '../utlis/loading';
import color from './Styled/colorTheme';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  Container7,
  Container8,
  Container9,
  Container10,
  Container11,
  Image1,
  Image2,
  Image3,
  Title1,
  Title2,
  Title3,
  Button1,
  Text1,
  Strong
} from './Styled/Index'

import robot from '../image/day27-my-robot.png';
import canvasStand from '../image/day10-canvas-stand.png';
import colorTools from '../image/gummy-color-tools.png';
import floppy from '../image/day18-floppy.png';

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
      <Container9 key={img_name} onClick={() => clickMemeImg()}>
        <Image3 src={img_url} alt={img_name} />
      </Container9>
    );
  }

  return (
    <Container0>
      <div style={{ 'width': '100%', 'backgroundColor': '#ffc349' }}>
        <Container1 color={color}>
          <Image1 alt='index-main-img' src={robot}></Image1>
          <Container2>
            <Title1>製作專屬於你的迷因</Title1>
            <Link to="/templates"><Button1 color={color}>開始使用</Button1></Link>
            <Text1>或是</Text1>
            <Text1>點選右上角<Strong color={color}>登入</Strong></Text1>
          </Container2>
        </Container1>
      </div>
      <div style={{ 'width': '100%', 'backgroundColor': '#fff' }}>
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
      </div>
      <div style={{ 'width': '100%', 'backgroundColor': '#056' }}>
        <Container7 color={color}>
          <Title3>熱門創作</Title3>
          <Container8>
            {camapignMeme ? camapignMeme.map((item) => renderCampaignMeme(item)) : loading('spinningBubbles', '#fff', 50, 50)}
          </Container8>
          <Container10><Link to="/explorememes"><Container11>查看更多</Container11></Link></Container10>
        </Container7>
      </div>
    </Container0>
  );
}

export default Index;