import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

import { getAllPublicMemeImg, getAllPublicMemeNextPage, searchPublicMeme } from '../../utlis/firebase';
import { countClickTime } from '../../utlis/countClickTime';
import { alertWarning } from '../../utlis/alert';

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #ffc349;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin-top: 45px;
  padding-bottom: 45px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 524px) {
    grid-template-columns: repeat(1, 250px);
  }
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
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  @media screen and (max-width: 660px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 524px) {
    width: 250px;
    height: 250px;
  }
`;

const Container3 = styled.div`
  display: flex;
  width: 850px;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 690px;
  }
  @media screen and (max-width: 768px) {
    width: 545px;
    flex-direction: column;
  }
  @media screen and (max-width: 660px) {
    width: 445px;
  }
  @media screen and (max-width: 524px) {
    width: 345px;
  }
`;

const Container4 = styled.div`
  display: flex;
  width: 400px;
  @media screen and (max-width: 768px) {
   margin-bottom: 20px;
  }
  @media screen and (max-width: 524px) {
    width: 100%;
  }
`;

const Img0 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Input0 = styled.input`
  flex: 1;
  border: 3px solid #056;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  &:focus{
    color: #056;
  }
`;

const Button0 = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #056;
  background: #056;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Button1 = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #056;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Select0 = styled.select`
  border: 0;
  outline: 0;
  font: inherit;
  height: 2rem;
  padding: 0 1rem 0 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

function AllMemes() {
  const selectSort = useRef(null);
  const keyword = useRef(null);
  const [sort, setSort] = useState('desc');
  const [allPublicMemeImg, setAllPublicMemeImg] = useState([]);
  const [lastKey, setLastKey] = useState();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (url === '/explorememes') {
      keyword.current.value = '';
    }
  }, [url])

  useEffect(() => {
    if (url === '/explorememes') {
      getAllPublicMemeImg(sort).then((res) => {
        setAllPublicMemeImg(res.allPublicMemeImgData);
        setLastKey(res.lastKey);
      });
    }
  }, [sort, url])

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

  const clickSearch = () => {
    if (keyword.current.value === '') {
      alertWarning(undefined, '請輸入搜尋關鍵字！');
    } else {
      searchPublicMeme(keyword.current.value)
        .then((res) => {
          history.push('/search');
          setAllPublicMemeImg(res);
          setLastKey(null);
        })
    }
  }

  const renderAllPublicMemeImg = (item) => {
    const { img_url, img_name } = item;
    const clickMemeImg = () => {
      countClickTime(img_name)
        .then(() => history.push(`/meme/${img_name}`));
    };
    return (
      <Container2 key={img_name} onClick={() => clickMemeImg()}>
        <Img0 src={img_url} alt={img_name} />
      </Container2>
    );
  }

  return (
    <Container0>
      <Container3>
        <Container4>
          <Input0 placeholder="輸入標題、tags......" type="search" ref={keyword} />
          <Button0 onClick={() => clickSearch()}><FaSearch /></Button0>
        </Container4>
        {url === '/explorememes' ?
          <div>
            <span>排序：</span>
            <Select0 ref={selectSort} onChange={() => clickSelectSort()}>
              <option value='desc'>依發布日期：由新到舊</option>
              <option value='asc'>依發布日期：由舊到新</option>
            </Select0>
          </div> : ""}
      </Container3>
      <Container1>
        {allPublicMemeImg ? allPublicMemeImg.map((item) => renderAllPublicMemeImg(item)) : ""}
      </Container1>
      {lastKey ? <Button1 onClick={() => getMoreMeme()}>載入更多</Button1> : <div>沒有囉！</div>}
    </Container0>
  )
}

export default AllMemes;