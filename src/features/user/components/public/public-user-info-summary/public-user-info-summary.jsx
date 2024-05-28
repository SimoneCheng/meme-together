import { useParams } from "react-router-dom";
// apis
import {
  addFollowing,
  addFollower,
  deleteFollower,
  unfollowing
} from "@/features/user/api";
// components
import { Button } from "@/components/button";
// hooks
import { useWatchPublicPersonalInfo } from "./use-watch-public-personal-info";
import { useWatchAllFollowing } from "./use-watch-all-following";
import { useWatchAllFollowers } from "./use-watch-all-followers";
import { useWatchPersonalFollowing } from "./use-watch-personal-following";
import { useWatchPersonalInfo } from "@/features/user/hooks";
// store
import {
  usePublicActiveOption,
  usePublicPersonalInfo,
  useAllFollowing,
  useAllFollowers,
  usePersonalFollowing,
  usePersonalInfo
} from "@/features/user/store";
// utils
import { alertSuccess } from "@/utlis/alert";
// styles
import {
  StyledWrapper,
  StyledImg
} from "./public-user-info.summary.style";

const FollowOrUnFollowButton = () => {
  const { id } = useParams();
  const [publicPersonalInfo] = usePublicPersonalInfo();
  const [personalInfo] = usePersonalInfo();
  const [personalFollowing] = usePersonalFollowing();

  if (!personalInfo.userId || personalInfo.userId === publicPersonalInfo.userId) {
    return null;
  }

  const isInFollowingList = personalFollowing.includes(id);

  const followUser = () => {
    const data = {
      user_id: publicPersonalInfo.userId
    };
    const selfData = {
      user_id: personalInfo.userId
    };
    addFollowing(personalInfo.userId, publicPersonalInfo.userId, data)
      .then(() => addFollower(publicPersonalInfo.userId, personalInfo.userId, selfData))
      .then(() => alertSuccess('追蹤成功！'));
  };

  const unfollowUser = () => {
    unfollowing(personalInfo.userId, publicPersonalInfo.userId)
      .then(() => deleteFollower(publicPersonalInfo.userId, personalFollowing.userId))
      .then(() => alertSuccess('已取消追蹤！'));
  };

  if (isInFollowingList) {
    return (
      <Button
        variant="solid"
        colorScheme="yellow"
        onClick={unfollowUser}
      >
        取消追蹤
      </Button>
    );
  }

  return (
    <Button
      variant="solid"
      colorScheme="yellow"
      onClick={followUser}
    >
      追蹤
    </Button>
  );
};

const PublicUserInfoSummary = () => {
  const { id } = useParams();
  const [publicPersonalInfo] = usePublicPersonalInfo();
  const [allFollowing] = useAllFollowing();
  const [allFollowers] = useAllFollowers();
  const [, setActiveOption] = usePublicActiveOption();

  useWatchPublicPersonalInfo(id);
  useWatchAllFollowing(id);
  useWatchAllFollowers(id);
  useWatchPersonalFollowing();
  useWatchPersonalInfo();

  return (
    <StyledWrapper>
      <div>
        <StyledImg
          alt="profile-img"
          src={publicPersonalInfo.userImg}
        />
        <p>
          <strong>{publicPersonalInfo.userName}</strong>
          <br />
          {publicPersonalInfo.selfIntro}
        </p>
        <FollowOrUnFollowButton />
      </div>
      <Button
        variant="unstyled"
        onClick={() => setActiveOption('allPublicMeme')}
      >
        <p>
          創作
        </p>
        <p>
          <strong>{3}</strong>
        </p>
      </Button>
      <Button
        variant="unstyled"
        onClick={() => setActiveOption('followers')}
      >
        <p>
          粉絲
        </p>
        <p>
          <strong>{allFollowers.ids.length}</strong>
        </p>
      </Button>
      <Button
        variant="unstyled"
        onClick={() => setActiveOption('following')}
      >
        <p>
          追蹤中
        </p>
        <p>
          <strong>{allFollowing.ids.length}</strong>
        </p>
      </Button>
    </StyledWrapper>
  );
};

export default PublicUserInfoSummary;
