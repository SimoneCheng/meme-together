import { useEffect } from "react";
import {
  getAllFollowers,
  deleteFollower,
  addFollower,
  unfollowing,
  addFollowing
} from "@/features/user/api";
import {
  useAllFollowing,
  useAllFollowers,
  usePersonalInfo
} from "@/features/user/store";
import { alertSuccess } from "@/utlis/alert";
import {
  StyledLink,
  StyledWrapper,
  StyledNoContentWrapper,
  StyledImg,
  StyledButton
} from "./all-followers.style";

const Follower = (props) => {
  const {
    user_id,
    user_name,
    user_img,
  } = props;
  const [personalInfo] = usePersonalInfo();
  const [allFollowing] = useAllFollowing();
  const isInAllFollowing = allFollowing.ids.includes(user_id);

  const handleDeleteFollower = () => {
    deleteFollower(personalInfo.userId, user_id)
      .then(() => unfollowing(user_id, personalInfo.userId))
      .then(() => alertSuccess('成功移除！'));
  };

  const handleFollowUser = () => {
    const data = { user_id };
    const selfData = { user_id: personalInfo.userId };
    addFollowing(personalInfo.userId, user_id, data)
      .then(() => addFollower(user_id, personalInfo.userId, selfData))
      .then(() => alertSuccess('追蹤成功！'));
  };

  const handleUnfollowUser = () => {
    unfollowing(personalInfo.userId, user_id)
      .then(() => deleteFollower(user_id, personalInfo.useId))
      .then(() => alertSuccess('已取消追蹤！'));
  };

  return (
    <StyledLink to={`/public/${user_id}`}>
      <StyledImg src={user_img} alt={user_id} />
      <p>{user_name}</p>
      {personalInfo.userId === user_id && (
        <StyledButton
          colorScheme="yellow"
          variant="solid"
          onClick={handleDeleteFollower}
        >
          移除
        </StyledButton>
      )}
      {isInAllFollowing ? (
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

const AllFollowers = () => {
  const [allFollowers, setAllFollowers] = useAllFollowers();
  const { ids, allFollowersList } = allFollowers;

  useEffect(() => {
    if (ids.length === 0) return;
    getAllFollowers(ids)
      .then((res) => {
        setAllFollowers({ allFollowersList: res });
      });
  }, [ids, setAllFollowers])

  if (allFollowersList.length === 0) {
    return (
      <StyledNoContentWrapper>
        目前沒有粉絲喔～
      </StyledNoContentWrapper>
    );
  }

  return (
    <StyledWrapper>
      {allFollowersList.map((item) => {
        return <Follower key={item.user_id} {...item} />
      })}
    </StyledWrapper>
  );
};

export default AllFollowers;
