import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { setAllEditingMeme } from '../../redux/actions';
import { getAllEditingMeme } from '../../utlis/firebase';

const Container0 = styled.div`
  text-align: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 16px;
  margin: 50px;
  justify-content: center;
  align-items: stretch; 
`;

const Container2 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 250px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;


const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function AllEditingMeme() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const allEditingMeme = useSelector((state) => state.allEditingMeme);

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            getAllEditingMeme(userData.user_id, dispatch, setAllEditingMeme);
        }
    }, [userData]);

    const renderEditingMeme = (imgSrc, docId) => {
        return (
            <Container2>
                <Link to={`/personal/meme-generator/${docId}`}><Img0 src={imgSrc} alt={docId}></Img0></Link>
            </Container2>
        );
    }

    return (
        <Container0>
            <Container1>
                {allEditingMeme ? allEditingMeme.map((item) => renderEditingMeme(item.data.backgroundImage_src, item.docId)) : ""}
            </Container1>
            <Link to="/templates"><button>新增創作</button></Link>
        </Container0>
    )
}

export default AllEditingMeme;
