import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { useWatchPersonalInfo } from "@/features/user/hooks";
import { usePersonalInfo } from "@/features/user/store";
import { StyledImg, StyledItem, StyledWrapper } from "./user-info-summary.style";

const UserInfoSummary = () => {
  const [personalInfo] = usePersonalInfo();

  useWatchPersonalInfo();

  return (
    <StyledWrapper>
      <StyledItem>
        <StyledImg
          alt="profile-img"
          src={personalInfo.userImg}
        />
      </StyledItem>
      <StyledItem>
        <p>
          <strong>暱稱：</strong>
          {personalInfo.userName}
        </p>
        <p>
          <strong>電子信箱：</strong>
          {personalInfo.userEmail}
        </p>
      </StyledItem>
      <StyledItem>
        <Link to={`/public/${personalInfo.userId}`}>
          <Button colorScheme="navyBlue" variant="solid">
            前往個人公開頁面
          </Button>
        </Link>
      </StyledItem>
    </StyledWrapper>
  );
};

export default UserInfoSummary;
