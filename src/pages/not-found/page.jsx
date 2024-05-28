import 'animate.css';
// hooks
import { useScrollTo } from '@/hooks';
// styles
import {
  Wrapper,
  StyledText,
  WarningMessage,
  GobackToHomepageText,
  LinkToHomepage,
  Img404
} from './style';

const imgSrc = "https://firebasestorage.googleapis.com/v0/b/meme-together.appspot.com/o/404image.jpeg?alt=media&token=9540dd77-03cd-4ea9-9931-086e29cc338d";

function PageNotFound() {
  useScrollTo();

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
