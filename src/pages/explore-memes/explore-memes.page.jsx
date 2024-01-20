import { AllPublicMemes } from '@/features/meme-explorer';
import { StyledWrapper } from './explore-memes.style';
import { useScrollTo } from '@/hooks';

const ExploresMemes = () => {
  useScrollTo();
  return (
    <StyledWrapper>
      <AllPublicMemes />
    </StyledWrapper>
  );
};

export default ExploresMemes;
