import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { applyMiddleware } from 'redux';
import styled from 'styled-components';

import { getAllPublicMemeImg } from '../../utlis/firebase';

const Container0 = styled.div`
  padding-top: 100px;
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

const Container3 = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function AllMemes() {
    const [allPublicMemeImg, setAllPublicMemeImg] = useState();

    useEffect(() => {
        getAllPublicMemeImg(setAllPublicMemeImg);
    }, [])

    const renderAllPublicMemeImg = (item) => {
        const { img_url, img_name } = item;

        return (
            <Container2>
                <Link to={`/meme/${img_name}`}><Img0 src={img_url} alt={img_name}></Img0></Link>
            </Container2>
        );
    }

    return (
        <Container0>
            <Container3>
                <div>
                    <input type="search" id="site-search" name="q" aria-label="Search through site content" />
                    <button>Search</button>
                </div>
                <select>
                    <option>選擇排序</option>
                    <option>依熱門程度</option>
                    <option>依最新發布日期：由新到舊</option>
                    <option>依最新發布日期：由舊到新</option>
                </select>
            </Container3>
            <Container1>
                {allPublicMemeImg ? allPublicMemeImg.map((item) => renderAllPublicMemeImg(item)) : ""}
            </Container1>
        </Container0>
    )
}

export default AllMemes;