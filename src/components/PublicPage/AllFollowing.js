import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getAllFollowing,
  unfollowing,
  deleteFollower,
  addFollowing,
  addFollower
} from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';
import { loading } from '../../utlis/loading';
import { 
  Container0,
  Container3,
  Container4,
  Container5,
  Container6,
  Container7,
  Img1,
  Button0
 } from '../Styled/PublicPage/Common';

function AllFollowing(props) {
  const allFollowing = props.allFollowing;
  const allFollowingSelf = props.allFollowingSelf;
  const [followingList, setFollowingList] = useState();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (allFollowing.length > 0) {
      getAllFollowing(allFollowing)
        .then((res) => {
          setFollowingList(res);
        })
    } else {
      setFollowingList([]);
    }
  }, [allFollowing]);

  const followUser = (id) => {
    const data = { user_id: id };
    const selfData = { user_id: userData.user_id };
    addFollowing(userData.user_id, id, data)
      .then(() => addFollower(id, userData.user_id, selfData))
      .then(() => alertSuccess('追蹤成功！'));
  }

  const unfollowUser = (id) => {
    unfollowing(userData.user_id, id)
      .then(() => deleteFollower(id, userData.user_id))
      .then(() => alertSuccess('已取消追蹤！'));
  }

  const renderFollowing = (item) => {
    return (
      <Container4 key={item.user_id}>
        <Container5>
          <Link to={`/public/${item.user_id}`}><Img1 src={item.user_img} alt={item.user_id} /></Link>
        </Container5>
        <Container6>
          <Link to={`/public/${item.user_id}`} rel="noreferrer">{item.user_name}</Link>
        </Container6>
        <Container7>
          {userData != null
            && Object.keys(userData).length > 0 ?
            (item.user_id === userData.user_id ? "" :
              (allFollowingSelf.includes(item.user_id) ?
                <Button0 onClick={() => unfollowUser(item.user_id)}>取消追蹤</Button0>
                : <Button0 onClick={() => followUser(item.user_id)}>追蹤</Button0>))
            : ""}
        </Container7>
      </Container4>
    );
  }

  const renderNone = () => {
    return (
      <Container0>
        目前沒有追蹤任何人喔～
      </Container0>
    )
  }

  return (
    <Container3>
      {followingList ? (followingList.length > 0 ? followingList.map((item) => renderFollowing(item)) : renderNone()) : <Container0>{loading('spinningBubbles', '#fff', 50, 50)}</Container0>}
    </Container3>
  );
}

export default AllFollowing;