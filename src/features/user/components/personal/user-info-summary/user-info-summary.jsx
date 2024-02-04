import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { getUserInfo } from "../../../api";
import { StyledImg, StyledItem, StyledWrapper } from "./user-info-summary.style";

const UserInfoSummary = () => {
  const userId = useSelector((state) => state.userData?.user_id);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = getUserInfo({
      id: userId,
      callback: setUserInfo
    });
    return () => unsubscribe();
  }, [userId])

  return (
    <StyledWrapper>
      <StyledItem>
        <StyledImg
          alt="profile-img"
          src={userInfo?.user_img}
        />
      </StyledItem>
      <StyledItem>
        <p>
          <strong>暱稱：</strong>
          {userInfo?.user_name}
        </p>
        <p>
          <strong>電子信箱：</strong>
          {userInfo?.user_email}
        </p>
      </StyledItem>
      <StyledItem>
        <Link to={`/public/${userId}`}>
          <Button colorScheme="navyBlue" variant="solid">
            前往個人公開頁面
          </Button>
        </Link>
      </StyledItem>
    </StyledWrapper>
  );
};

export default UserInfoSummary;
