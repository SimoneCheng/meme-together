import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'animate.css';
// store
import { setCanvas } from '@/redux/actions';
// styles
import {
  Wrapper,
  StyledText,
  WarningMessage,
  GobackToHomepageText,
  LinkToHomepage,
  Img404
} from './page-not-found.style';

const imgSrc = "https://firebasestorage.googleapis.com/v0/b/meme-together.appspot.com/o/404image.jpeg?alt=media&token=9540dd77-03cd-4ea9-9931-086e29cc338d";

function PageNotFound() {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (canvas === null) {
      dispatch(setCanvas(''));
    }
  }, [canvas, dispatch])

  return (
    <Wrapper>
      <StyledText>
        <WarningMessage className="animate__hinge">
          Oops...
        </WarningMessage>
        <GobackToHomepageText>
          此頁不存在！
        </GobackToHomepageText>
        <LinkToHomepage to='/'>
          點我回首頁
        </LinkToHomepage>
      </StyledText>
      <div>
        <Img404 alt='404' src={imgSrc} />
      </div>
    </Wrapper>
  );
}

export default PageNotFound;
