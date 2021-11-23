import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';

import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  Img0,
  Button0
} from '../Styled/PersonalPage/Common';
import { deleteEditingMeme } from '../../utlis/firebase';
import { alertSuccess } from '../../utlis/alert';

function AllEditingMeme(props) {
  const allEditingMeme = props.allEditingMeme;
  const userData = useSelector((state) => state.userData);

  const renderEditingMeme = (imgSrc, docId, createdTime, lastSaveTime) => {
    return (
      <Container1 key={docId}>
        <Link to={`/personal/meme-generator/${docId}`}><Img0 src={imgSrc} alt={docId}></Img0></Link>
        <Container2>
          <Container3><strong>建立時間：</strong></Container3>
          <Container3>{new Date(createdTime.toDate()).toLocaleString()}</Container3>
          <Container3><strong>上次儲存時間：</strong></Container3>
          <Container3>{new Date(lastSaveTime.toDate()).toLocaleString()}</Container3>
          <Button0 color={color} onClick={() => { deleteEditingMeme(userData.user_id, docId).then(() => alertSuccess('刪除成功！')) }}>刪除</Button0>
        </Container2>
      </Container1>
    );
  }

  const renderAllEditingMeme = () => {
    return (
      <Container0>
        {allEditingMeme ? allEditingMeme.map((item) => renderEditingMeme(item.data.backgroundImage_src, item.docId, item.data.created_time, item.data.last_save_time)) : ""}
        <Container4>
          <Link to="/templates">
            <Container5><MdAddCircleOutline /></Container5>
          </Link>
          <div>
            <Link to="/templates" style={{ 'color': '#056' }}>新增創作</Link>
          </div>
        </Container4>
      </Container0>
    )
  }

  const renderNone = () => {
    return (
      <Container6>
        空空的喔～
      </Container6>
    );
  }

  return (
    <>
      {allEditingMeme.length > 0 ? renderAllEditingMeme() : renderNone()}
    </>
  )
}

export default AllEditingMeme;