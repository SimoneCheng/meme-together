import React from 'react';
import { useHistory } from 'react-router-dom';

import { countClickTime } from '../../utlis/countClickTime';
import {
  Container0,
  Container1,
  Container2,
  Img0
} from '../Styled/PublicPage/Common';

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
      <Container0 style={{ 'paddingBottom': '50px' }}>
        目前沒有創作喔～
      </Container0>
    )
  }

  return (
    <>
      {memeImg.length > 0 ? renderAllMemeImg() : renderNone()}
    </>
  )

};

export default AllPublicMemeImg;