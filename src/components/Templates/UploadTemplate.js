import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Compressor from 'compressorjs';

import { uploadTemplate, getTemplateURL, saveNewTemplate } from '../../utlis/firebase';

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
`;

const Container1 = styled.div`
  
`;

const Img0 = styled.img`
  width: 300px;
`;

function UploadTemplate() {
  const [imagePreview, setImagePreview] = useState();
  const [compressedFile, setCompressedFile] = useState();
  const userData = useSelector((state) => state.userData);


  const clickUploadTemplate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const src = window.URL.createObjectURL(file);
      new Compressor(file, {
        quality: 1,
        width: 600,
        success: (compressedResult) => {
          setCompressedFile(compressedResult);
          setImagePreview(src);
        },
      });
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
      .then(() => alert('成功發布新模板！'))
  }

  return (
    <Container0>
      <Container1>
        <input type="file" accept="image/*" onChange={(e) => clickUploadTemplate(e)}></input>
        <br></br>
        {imagePreview ? <Img0 alt="imagePreview" src={imagePreview} /> : ""}
        <br></br>
        {userData !== null && Object.keys(userData).length > 0 && compressedFile ? <button onClick={() => clickDonateTemplate()}>貢獻模板</button> : <p>上傳一張圖片才能貢獻模板喔！</p>}
      </Container1>
    </Container0>
  )
}

export default UploadTemplate;