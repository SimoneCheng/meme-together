import { useEffect } from "react";
import {
  getAllFollowing,
  addFollowing,
  unfollowing,
  addFollower,
  deleteFollower
} from "@/features/user/api";
import {
  usePersonalFollowing,
  usePersonalInfo,
  useAllFollowing
} from "@/features/user/store";
import { alertSuccess } from "@/utlis/alert";
import {
  StyledWrapper,
  StyledNoContentWrapper,
  StyledLink,
  StyledImg,
  StyledButton,
  StyledP
} from "./all-following.style";

const Following = (props) => {
  const {
    user_id,
    user_name,
    user_img,
  } = props;
  const [personalInfo] = usePersonalInfo();
  const [personalFollowing] = usePersonalFollowing();
  const isInPersonalFollowing = personalFollowing.includes(user_id);

  const handleFollowUser = () => {
    const data = { user_id };
    const selfData = { user_id: personalInfo.userId };
    addFollowing(personalInfo.userId, user_id, data)
      .then(() => addFollower(user_id, personalInfo.userId, selfData))
      .then(() => alertSuccess('追蹤成功！'));
  };

  const handleUnfollowUser = () => {
    unfollowing(personalInfo.userId, user_id)
      .then(() => deleteFollower(user_id, personalInfo.userId))
      .then(() => alertSuccess('已取消追蹤！'));
  };

  if (personalInfo.userId === user_id || !personalInfo.userId) {
    return (
      <StyledLink to={`/public/${user_id}`}>
        <StyledImg src={user_img} alt={user_id} />
        <p>{user_name}</p>
      </StyledLink>
    );
  }

  return (
    <StyledLink to={`/public/${user_id}`}>
      <StyledImg src={user_img} alt={user_id} />
      <p>{user_name}</p>
      {isInPersonalFollowing ? (
        <StyledButton
          colorScheme="yellow"
          variant="solid"
          onClick={handleUnfollowUser}
        >
          取消追蹤
        </StyledButton>
      ) : (
        <StyledButton
          colorScheme="yellow"
          variant="solid"
          onClick={handleFollowUser}
        >
          追蹤
        </StyledButton>
      )}
    </StyledLink>
  );
};

const AllFollowing = () => {
  const [allFollowing, setAllFollowing] = useAllFollowing();
  const { ids, allFollowingList } = allFollowing;

  useEffect(() => {
    if (ids.length === 0) {
      setAllFollowing({ allFollowingList: [] });
      return;
    }
    getAllFollowing(ids)
      .then((res) => {
        setAllFollowing({ allFollowingList: res });
      });
  }, [ids, setAllFollowing]);

  if (allFollowingList.length === 0) {
    return (
      <>
        <StyledP>追蹤名單</StyledP>
        <StyledNoContentWrapper>
          目前沒有追蹤任何人喔～
        </StyledNoContentWrapper>
      </>
    );
  }

  return (
    <StyledWrapper>
      <StyledP>追蹤名單</StyledP>
      {allFollowingList.map((item) => {
        return <Following key={item.user_id} {...item} />;
      })}
    </StyledWrapper>
  );
};

export default AllFollowing;
