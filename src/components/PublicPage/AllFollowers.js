import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getAllFollowers, deleteFollower, unfollowing, addFollower, addFollowing } from '../../utlis/firebase';
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

function AllFollowers(props) {
    const { id } = useParams();
    const allFollowers = props.allFollowers;
    const allFollowingSelf = props.allFollowingSelf;
    const [followersList, setFollowersList] = useState();
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        if (allFollowers.length > 0) {
            getAllFollowers(allFollowers)
                .then((res) => {
                    setFollowersList(res);
                })
        } else {
            setFollowersList([]);
        }
    }, [allFollowers]);

    const deleteFollowers = (id) => {
        deleteFollower(userData.user_id, id)
            .then(() => unfollowing(id, userData.user_id))
            .then(() => alertSuccess('成功移除！'));
    }

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
                    <Link to={`/public/${item.user_id}`}>{item.user_name}</Link>
                </Container6>
                <Container7>
                    {userData != null
                        && Object.keys(userData).length > 0 ?
                        (userData.user_id === id ?
                            <Button0 onClick={() => deleteFollowers(item.user_id)}>移除</Button0>
                            : (item.user_id === userData.user_id ? ""
                                : (allFollowingSelf.includes(item.user_id) ?
                                    <Button0 onClick={() => unfollowUser(item.user_id)}>取消追蹤</Button0>
                                    : <Button0 onClick={() => followUser(item.user_id)}>追蹤</Button0>))) : ""}
                </Container7>
            </Container4>
        );
    }

    const renderNone = () => {
        return (
            <Container0>
                目前沒有粉絲喔～
            </Container0>
        )
    }

    return (
        <Container3>
            {followersList ?
                (followersList.length > 0 ? followersList.map((item) => renderFollowing(item)) : renderNone())
                : <Container0>{loading('spinningBubbles', '#fff', 50, 50)}</Container0>}
        </Container3>
    );
}

export default AllFollowers;