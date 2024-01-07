import { AllTemplates } from "@/features/meme-templates";
import { StyledH1, StyledWrapper } from "./templates.style";

const Templates = () => {
  return (
    <StyledWrapper>
      <StyledH1>
        選擇模板
      </StyledH1>
      <AllTemplates />
    </StyledWrapper>
  );
};

export default Templates;
