import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Compressor from 'compressorjs';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import { uploadTemplate, getTemplateURL, saveNewTemplate } from '../../utlis/firebase';
import { alertError, alertSuccess } from '../../utlis/alert';

const Container0 = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container1 = styled.div`
  width: 600px;
  z-index: 1;
  margin-bottom: 50px;
`;

const Container2 = styled.div`
  width: 600px;
  height: 300px;
  border: 5px solid #ccc;
  border-style: dashed;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.03);
  color: #ccc;
  &:hover{
    border: 5px solid #056;
    border-style: dashed;
  }
`;

const Container3 = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const Input0 = styled.input`
  display: none;
`;

const Label0 = styled.label`
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Li0 = styled.li`
  list-style: none;
  float: left;
  width: 50%;
  position: relative;
  text-align: center;
  :before {
    content:counter(step);
    counter-increment: step;
    width: 30px;
    height: 30px;
    border: 2px solid #bebebe;
    display: block;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    line-height: 27px;
    background: white;
    color: #bebebe;
    text-align: center;
    font-weight: bold;
  }
  :after {
    content: '';
    position: absolute;
    width:100%;
    height: 2px;
    background: #bebebe;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
  :first-child:after {
    content: none;
  }
  :first-child:before {
    border-color: #056;
    background: #056;
    color: white;
  }
  :nth-child(2):before {
    border-color: ${props => props.imagePreview ? '#056' : '#bebebe'};
    background: ${props => props.imagePreview ? '#056' : 'white'};
    color: ${props => props.imagePreview ? '#fff' : '#bebebe'};
    transition: 0.5s ease;
  }
  :nth-child(2):after {
    background: ${props => props.imagePreview ? '#056' : '#bebebe'};
    transition: 0.5s ease;
  }
`;

const Img0 = styled.img`
  width: 600px;
`;

const Button0 = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #056;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Button1 = styled.button`
  border: 1px #056 solid;
  border-radius: 5px;
  color: #056;
  background-color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  cursor: pointer;
  :hover {
    background-color:#056;
    color: #fff;
  } 
`;

function UploadTemplate() {
  const [imagePreview, setImagePreview] = useState();
  const [compressedFile, setCompressedFile] = useState();
  const userData = useSelector((state) => state.userData);
  const history = useHistory();

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