import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowers } from '../../utlis/firebase';

function AllFollowers(props) {
    const allFollowers = props.allFollowers;
    const [followersList, setFollowersList] = useState([]);

    useEffect(() => {
        if (allFollowers.length > 0) {
            getAllFollowers(allFollowers)
                .then((res) => {
                    setFollowersList(res);
                })
        }
    }, [allFollowers]);

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
            {followersList.length > 0 ? followersList.map((item) => renderFollowing(item)) : ""}
        </>
    );

}

export default AllFollowers;