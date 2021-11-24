import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import { getAllPublicMemeImg, getAllPublicMemeNextPage, searchPublicMeme } from '../../utlis/firebase';
import { countClickTime } from '../../utlis/countClickTime';
import { alertWarning } from '../../utlis/alert';
import { loading } from '../../utlis/loading';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Input0,
  Img0,
  Button0,
  Button1,
  Select0
} from '../Styled/Templates_and_ExplorePage/Common';

function AllMemes() {
  const selectSort = useRef(null);
  const keyword = useRef(null);
  const [sort, setSort] = useState('desc');
  const [allPublicMemeImg, setAllPublicMemeImg] = useState();
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
      getAllPublicMemeNextPage(lastKey, sort)
        .then((res) => {
          setAllPublicMemeImg(allPublicMemeImg.concat(res.allPublicMemeImgData));
          setLastKey(res.lastKey);
        })
    }
  }

  const clickSelectSort = () => setSort(selectSort.current.value);

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
      <Container3 key={img_name} onClick={() => clickMemeImg()}>
        <Img0 src={img_url} alt={img_name} />
      </Container3>
    );
  }

  return (
    <Container1>
      <Container4>
        <Container5>
          <Input0 placeholder="輸入標題、tags......" type="search" ref={keyword} />
          <Button0 onClick={() => clickSearch()}><FaSearch /></Button0>
        </Container5>
        {url === '/explorememes' ?
          <div>
            <span>排序：</span>
            <Select0 ref={selectSort} onChange={() => clickSelectSort()}>
              <option value='desc'>依發布日期：由新到舊</option>
              <option value='asc'>依發布日期：由舊到新</option>
            </Select0>
          </div>
          : ""}
      </Container4>
      {allPublicMemeImg ?
        <Container2>
          {allPublicMemeImg.map((item) => renderAllPublicMemeImg(item))}
        </Container2>
        : <Container0>{loading('spinningBubbles', '#056', 50, 50)}</Container0>}
      {allPublicMemeImg ?
        (lastKey ? <Button1 onClick={() => getMoreMeme()}>載入更多</Button1> : <div>沒有囉！</div>)
        : ""}
    </Container1>
  )
}

export default AllMemes;