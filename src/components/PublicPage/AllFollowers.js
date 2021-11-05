import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowers, deleteFollower, unfollowing } from '../../utlis/firebase';

function AllFollowers(props) {
    const { id } = useParams();
    const allFollowers = props.allFollowers;
    const [followersList, setFollowersList] = useState([]);
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        if (allFollowers.length > 0) {
            getAllFollowers(allFollowers)
                .then((res) => {
                    setFollowersList(res);
                })
        }
    }, [allFollowers]);

    const deleteFollowers = (id) => {
        deleteFollower(userData.user_id, id)
        .then(() => unfollowing(id, userData.user_id))
        .then(() => alert('成功移除！'));
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
                {userData && Object.keys(userData).length > 0 && userData.user_id === id ?　<button onClick={() => deleteFollowers(item.user_id)}>移除</button> : ""}
            </>
        );
    }

    return (
        <>
            {allFollowers.length > 0 && followersList.length > 0 ? followersList.map((item) => renderFollowing(item)) : ""}
        </>
    );

}

export default AllFollowers;