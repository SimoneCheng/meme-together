import { AllPublicMemes } from '@/features/meme-explorer';
import { StyledWrapper } from './explore-memes.style';

const ExploresMemes = () => {
  return (
    <StyledWrapper>
      <AllPublicMemes />
    </StyledWrapper>
  );
};

export default ExploresMemes;
