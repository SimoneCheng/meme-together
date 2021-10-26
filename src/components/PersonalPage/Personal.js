import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Img0 = styled.img`
  width: 100px;
`;

const Container0 = styled.div`
  padding-top: 100px;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container2 = styled.div`
  margin-right: 20px;
  margin-top: 20px;
`;

function Personal() {
    const history = useHistory();
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        if (userData === null) { history.push('/'); }
    }, [userData])

    return (
        <Container0>
            <Container1>
                <Container2>
                    <Img0 alt="profile-img" src="https://teameowdev.files.wordpress.com/2016/04/teameow-e9a090e8a8ade9a0ade8b2bc.jpg"></Img0>
                </Container2>
                <Container2>
                    <p>userID：6csVLium02WfOM5ZqYoR6nMH0643</p>
                    <p>userName：admin</p>
                    <p>userEmail：test@test.com</p>
                </Container2>
                <Container2>
                    { userData ? <Link to={`/public/${userData.user_id}`}><button>前往個人公開頁面</button></Link> : ""}
                </Container2>
            </Container1>
            <Container1>
                <Container2>
                    <Link to="/personal">創作中</Link>
                    <span>(0)</span>
                </Container2>
                <Container2>
                    <Link to="/personal?status=completed">已完成</Link>
                    <span>(0)</span>
                </Container2>
                <Container2>
                    <Link to="/personal?status=published">已發布</Link>
                    <span>(0)</span>
                </Container2>
                <Container2>
                    <Link to="/personal?status=favorite">收藏</Link>
                    <span>(0)</span>
                </Container2>
            </Container1>
        </Container0>
    )
}

export default Personal;