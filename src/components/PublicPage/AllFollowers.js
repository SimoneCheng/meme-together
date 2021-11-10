import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAllFollowers, deleteFollower, unfollowing, addFollower, addFollowing } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';
import loading from '../../utlis/loading';

const Container = styled.div`
  color: #fff;
  font-size: 40px;
  padding-top: 100px;
  text-align: center;
`;

const Container0 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 14px;
`;

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
            <Container1 key={item.user_id}>
                <Container2>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer"><Img0 src={item.user_img} alt={item.user_id} /></a>
                </Container2>
                <Container3>
                    <a target='_blank' href={`/public/${item.user_id}`} rel="noreferrer">{item.user_name}</a>
                </Container3>
                <Container4>
                    {userData.user_id === id ?
                        <Button0 onClick={() => deleteFollowers(item.user_id)}>移除</Button0>
                        : (item.user_id === userData.user_id ? ""
                            : (allFollowingSelf.includes(item.user_id) ?
                                <Button0 onClick={() => unfollowUser(item.user_id)}>取消追蹤</Button0>
                                : <Button0 onClick={() => followUser(item.user_id)}>追蹤</Button0>))}
                </Container4>
            </Container1>
        );
    }

    const renderNone = () => {
        return (
            <Container>
                目前沒有粉絲喔～
            </Container>
        )
    }

    return (
        <Container0>
            {followersList ?
                (followersList.length > 0 ? followersList.map((item) => renderFollowing(item)) : renderNone())
                : <Container>{loading('spinningBubbles', '#fff', 50, 50)}</Container>}
        </Container0>
    );

}

export default AllFollowers;