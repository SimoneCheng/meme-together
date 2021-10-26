import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container0 = styled.div`
  padding-top: 100px;
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 20px 10px;
  width: 500px;
  margin: 0 auto;
`;

const Container2 = styled.div`
  margin-right: 30px;
  text-align: center;
  cursor: pointer;
`;

const Img0 = styled.img`
  width: 200px;
  margin-right: 30px;
`;

function Public() {
    return (
        <Container0>
            <Container1>
                <Img0 alt="profile-img" src="https://teameowdev.files.wordpress.com/2016/04/teameow-e9a090e8a8ade9a0ade8b2bc.jpg"></Img0>
                <Container2>
                    <p>我的創作</p>
                    <p>0</p>
                </Container2>
                <Container2>
                    <p>粉絲</p>
                    <p>1000</p>
                </Container2>
                <Container2>
                    <p>追蹤中</p>
                    <p>0</p>
                </Container2>
            </Container1>
        </Container0>
    )
}

export default Public;