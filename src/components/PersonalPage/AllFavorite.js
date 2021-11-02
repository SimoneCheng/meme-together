import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { deletFromFavorite } from '../../utlis/firebase';

const Container0 = styled.div`

`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 16px;
  margin: 50px;
  justify-content: center;
  align-items: flex-start;
`;

const Container2 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function AllFavorite(props) {
    const allFavorite = props.allFavorite;
    const userData = useSelector((state) => state.userData);

    const renderFavorite = (item) => {
        const { img_url, img_name, created_time } = item;

        return (
            <Container2>
                <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
                <div>
                    <div>建立時間：{new Date(created_time.toDate()).toLocaleString()}</div>
                    <div>
                        <button onClick={() => deletFromFavorite(userData.user_id, img_name)}>刪除</button>
                    </div>
                </div>
            </Container2>
        );
    }

    return (
        <Container0>
            <Container1>
                {allFavorite ? allFavorite.map((item) => renderFavorite(item)) : ""}
            </Container1>
        </Container0>
    )
}

export default AllFavorite;