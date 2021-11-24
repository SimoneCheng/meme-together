import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import color from '../Styled/colorTheme';
import {
  Container0,
  Container2,
  Container3,
  Container6,
  H1,
  Strong,
  Img0,
  Button1
} from '../Styled/Templates_and_ExplorePage/Common';
import { getAllTemplates, getAllTemplatesNextPage } from '../../utlis/firebase';
import { loading } from '../../utlis/loading'

function Templates() {
  const { url } = useRouteMatch();
  const [allTemplates, setAllTemplates] = useState();
  const [lastKey, setLastKey] = useState();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTemplates()
      .then((res) => {
        setAllTemplates(res.allTemplatesData);
        setLastKey(res.lastKey);
      });
  }, [])

  const getMoreTemplates = () => {
    if (lastKey) {
      getAllTemplatesNextPage(lastKey)
        .then((res) => {
          setAllTemplates(allTemplates.concat(res.allTemplatesData));
          setLastKey(res.lastKey);
        })
    }
  }

  const clickTheTemplate = (imgId) => {
    history.push(`${url}/${imgId}`)
  }

  const renderAllTemplates = (imgURL, imgId) => {
    return (
      <Container3 key={imgId} onClick={() => clickTheTemplate(imgId)}>
        <Img0 src={imgURL} id={imgId} alt={`template-${imgId}`}></Img0>
      </Container3>
    );
  }

  return (
    <Container6>
      <H1><Strong color={color}>選擇模板</Strong></H1>
      {allTemplates ?
        <>
          <Container2>
            {allTemplates.map((item) => {
              const { image_url, image_id } = item;
              return renderAllTemplates(image_url, image_id);
            })}
          </Container2>
          {lastKey ? <Button1 onClick={() => getMoreTemplates()}>載入更多</Button1> : <div>沒有囉！</div>}
        </>
        : <Container0>{loading('spinningBubbles', '#056', 50, 50)}</Container0>}
    </Container6>
  )
}

export default Templates;