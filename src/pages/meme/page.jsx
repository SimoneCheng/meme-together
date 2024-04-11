import { SingleMeme } from "@/features/meme-explorer";
import { useScrollTo } from "@/hooks";
import { StyledWrapper } from "./style";

const Meme = () => {
  useScrollTo();

  return (
    <StyledWrapper>
      <SingleMeme />
    </StyledWrapper>
  );
};

export default Meme;
