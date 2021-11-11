import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowing, unfollowing, deleteFollower, addFollowing, addFollower } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';
import { loading } from '../../utlis/loading';

const Container = styled.div`
  color: #fff;
  font-size: 2rem;
  padding-top: 100px;
  text-align: center;
`;

const Container0 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const Container1 = styled.div`
  width: 800px;
  padding: 10px 10px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const Container2 = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container3 = styled.div`
  flex: 1;
`;

const Container4 = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
`;

const Img0 = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Button0 = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #ffc349;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  :hover{
    outline: 2px solid black;
  }
`;

function AllFollowing(props) {
    const { id } = useParams();
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
            <Container1 key={item.user_id}>
                <Container2>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer"><Img0 src={item.user_img} alt={item.user_id} /></a>
                </Container2>
                <Container3>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer">{item.user_name}</a>
                </Container3>
                <Container4>
                    {allFollowingSelf.includes(item.user_id) ? <Button0 onClick={() => unfollowUser(item.user_id)}>取消追蹤</Button0> : <Button0 onClick={() => followUser(item.user_id)}>追蹤</Button0>}
                </Container4>
            </Container1>
        );
    }

    const renderNone = () => {
        return (
            <Container>
                目前沒有追蹤任何人喔～
            </Container>
        )
    }

    return (
        <Container0>
            {followingList ? (followingList.length > 0 ? followingList.map((item) => renderFollowing(item)) : renderNone()) : <Container>{loading('spinningBubbles', '#fff', 50, 50)}</Container>}
        </Container0>

    );

}

export default AllFollowing;