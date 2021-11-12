import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getAllPublicMemeImg, getAllPublicMemeNextPage } from '../../utlis/firebase';
import { countClickTime } from '../../utlis/countClickTime';

const Container0 = styled.div`
  padding-top: 100px;
  background-color: #ffc349;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin-top: 45px;
  padding-bottom: 45px;
  justify-content: center;
  align-items: flex-start;
`;

const Container2 = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
`;

const Container3 = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function AllMemes() {
    const selectSort = useRef(null);
    const [sort, setSort] = useState('desc');
    const [allPublicMemeImg, setAllPublicMemeImg] = useState([]);
    const [lastKey, setLastKey] = useState({});
    const history = useHistory();

    useEffect(() => {
        getAllPublicMemeImg(sort).then((res) => {
            setAllPublicMemeImg(res.allPublicMemeImgData);
            setLastKey(res.lastKey);
        });
    }, [sort])

    const getMoreMeme = () => {
        if (lastKey) {
            getAllPublicMemeNextPage(lastKey, sort).then((res) => {
                setAllPublicMemeImg(allPublicMemeImg.concat(res.allPublicMemeImgData));
                setLastKey(res.lastKey);
            })
        }
    }

    const clickSelectSort = () => {
        setSort(selectSort.current.value);
    }

    const renderAllPublicMemeImg = (item) => {
        const { img_url, img_name } = item;
        const clickMemeImg = () => {
            countClickTime(img_name)
                .then(() => history.push(`/meme/${img_name}`));
        };
        return (
            <Container2 onClick={() => clickMemeImg()}>
                <Img0 src={img_url} alt={img_name} />
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
                <div>
                    <span>排序：</span>
                    <select ref={selectSort} onChange={() => clickSelectSort()}>
                        <option value='desc'>依最新發布日期：由新到舊</option>
                        <option value='asc'>依最新發布日期：由舊到新</option>
                    </select>
                </div>
            </Container3>
            <Container1>
                {allPublicMemeImg ? allPublicMemeImg.map((item) => renderAllPublicMemeImg(item)) : ""}
                {lastKey ? <button onClick={() => getMoreMeme()}>more meme</button> : <div>沒有囉！</div>}
            </Container1>
        </Container0>
    )
}

export default AllMemes;