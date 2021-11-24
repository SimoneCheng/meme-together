import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Compressor from 'compressorjs';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import { uploadTemplate, getTemplateURL, saveNewTemplate } from '../../utlis/firebase';
import { alertError, alertSuccess } from '../../utlis/alert';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Input0,
  Label0,
  Li0,
  Img0,
  Button0,
  Button1
} from '../Styled/Templates_and_ExplorePage/UploadTemplate';

function UploadTemplate() {
  const [imagePreview, setImagePreview] = useState();
  const [compressedFile, setCompressedFile] = useState();
  const userData = useSelector((state) => state.userData);
  const history = useHistory();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (userData === null) {
      history.push('/');
    }
  }, [userData])

  const clickUploadTemplate = (e) => {
    const file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const src = window.URL.createObjectURL(file);
      new Compressor(file, {
        quality: 1,
        width: 600,
        success: (compressedResult) => {
          setCompressedFile(compressedResult);
          setImagePreview(src);
        },
      });
    } else {
      alertError(undefined, '請上傳圖片（支援jpg、png檔）！');
    }
  }

  const clickDonateTemplate = () => {
    uploadTemplate(userData.user_id, compressedFile)
      .then((res) => {
        getTemplateURL(res)
          .then((url) => {
            const data = {
              image_id: res,
              image_url: url,
              created_time: new Date(),
              creator: userData.user_id
            }
            saveNewTemplate(res, data);
          })
      })
      .then(() => {
        alertSuccess('成功發布新模板！點擊左上角「創作」選擇新模板！');
        setCompressedFile(null);
        setImagePreview(null);
      })
  }

  const renderUploadImageDiv = () => {
    return (
      <Container2>
        <Label0 htmlFor="uploadimage"><MdOutlineAddPhotoAlternate style={{ 'fontSize': '6rem', 'marginBottom': '20px' }} />上傳一張圖片</Label0>
        <Input0 id="uploadimage" type="file" accept=".jpg, .png" onChange={(e) => clickUploadTemplate(e)} />
      </Container2>
    )
  }

  const renderPreview = () => {
    return (
      <div>
        <div>
          <Img0 alt="imagePreview" src={imagePreview} />
        </div>
        <Container3>
          <Button1 onClick={() => { setImagePreview(null); setCompressedFile(null); }}>上一步</Button1>
          <Button0 onClick={() => clickDonateTemplate()}>上傳模板</Button0>
        </Container3>
      </div>
    )
  }

  return (
    <Container0>
      <Container1>
        <ul style={{ 'counterReset': 'step' }}>
          <Li0 imagePreview={imagePreview}>選擇圖片（jpg或png）</Li0>
          <Li0 imagePreview={imagePreview}>預覽圖片然後上傳新模板</Li0>
        </ul>
      </Container1>
      <div>
        {imagePreview && compressedFile ? renderPreview() : renderUploadImageDiv()}
      </div>
    </Container0>
  )
}

export default UploadTemplate;