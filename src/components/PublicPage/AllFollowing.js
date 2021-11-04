import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowing } from '../../utlis/firebase';

function AllFollowing(props) {
    const allFollowing = props.allFollowing;
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        if (allFollowing.length > 0) {
            getAllFollowing(allFollowing)
                .then((res) => {
                    setFollowingList(res);
                })
        }
    }, [allFollowing]);

    const renderFollowing = (item) => {
        return (
            <>
                <div>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer"><img src={item.user_img} alt={item.user_id} /></a>
                </div>
                <div>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer">{item.user_name}</a>
                </div>
            </>
        );
    }

    return (
        <>
            {followingList.length > 0 ? followingList.map((item) => renderFollowing(item)) : ""}
        </>
    );

}

export default AllFollowing;