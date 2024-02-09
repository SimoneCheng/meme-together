import {
  PublicUserInfoSummary,
  PublicActiveContent
} from "@/features/user";
import { StyledWrapper } from "./public.style";

const Public = () => {
  return (
    <StyledWrapper>
      <PublicUserInfoSummary />
      <PublicActiveContent />
    </StyledWrapper>
  );
};

export default Public;
