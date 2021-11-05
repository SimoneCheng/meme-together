import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowing, unfollowing, deleteFollower } from '../../utlis/firebase';

function AllFollowing(props) {
    const { id } = useParams();
    const allFollowing = props.allFollowing;
    const [followingList, setFollowingList] = useState([]);
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        if (allFollowing.length > 0) {
            getAllFollowing(allFollowing)
                .then((res) => {
                    setFollowingList(res);
                })
        }
    }, [allFollowing]);

    const deleteFollowing = (id) => {
        unfollowing(userData.user_id, id)
            .then(() => deleteFollower(id, userData.user_id))
            .then(() => alert('已取消追蹤！'));
    }

    const renderFollowing = (item) => {
        return (
            <>
                <div>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer"><img src={item.user_img} alt={item.user_id} /></a>
                </div>
                <div>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer">{item.user_name}</a>
                </div>
                {userData && Object.keys(userData).length > 0 && userData.user_id === id ? <button onClick={() => deleteFollowing(item.user_id)}>取消追蹤</button> : ""}
            </>
        );
    }

    return (
        <>
            {allFollowing.length > 0 && followingList.length > 0 ? followingList.map((item) => renderFollowing(item)) : ""}
        </>
    );

}

export default AllFollowing;