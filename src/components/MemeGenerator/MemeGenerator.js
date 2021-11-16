import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import {
  MdTextFields,
  MdEdit,
  MdDelete,
  MdSaveAlt,
  MdImage
} from 'react-icons/md';
import { FaShapes } from 'react-icons/fa';
import styled from 'styled-components';
import { fabric } from 'fabric';

import { setCanvas } from '../../redux/actions';
import color from '../Styled/colorTheme';
import { getTheTemplate, getTheEditingMeme } from '../../utlis/firebase';
import TextEditor from './TextEditor';
import ShapeEditor from './ShapeEditor';
import DrawEditor from './DrawEditor';
import SaveButtons from './SaveButtons';
import { alertWarning } from '../../utlis/alert';

const Container0 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.color.color3.colorCode};
  padding-bottom: 50px;
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  color: #ccc;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  padding: 10px;
`;

const Container3 = styled.div`
  width: 170px;
`;

const Input0 = styled.input`
  display: none;
`;

const Label0 = styled.label`
  cursor: pointer;
  padding: 8px;
  background-color: #EFEFEF;
  outline: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
      outline: 3px solid #056;
  }
`;

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color4.colorCode};
  color: black;
`;

const TextEditorBtn = styled(MdTextFields)`
  cursor: pointer;
  color: ${props => props.status === 'text' ? '#056' : 'inherit'};
  outline: ${props => props.status === 'text' ? '2px solid #056' : 'none'};
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const ShapeEditorBtn = styled(FaShapes)`
  cursor: pointer;
  color: ${props => props.status === 'shape' ? '#056' : 'inherit'};
  outline: ${props => props.status === 'shape' ? '2px solid #056' : 'none'};
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const DrawEditorBtn = styled(MdEdit)`
  cursor: pointer;
  color: ${props => props.status === 'draw' ? '#056' : 'inherit'};
  outline: ${props => props.status === 'draw' ? '2px solid #056' : 'none'};
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const DeleteBtn = styled(MdDelete)`
  cursor: pointer;
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const ChangeImageBtn = styled(MdImage)`
  cursor: pointer;
  color: ${props => props.status === 'image' ? '#056' : 'inherit'};
  outline: ${props => props.status === 'image' ? '2px solid #056' : 'none'};
  border-radius: 10px;
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const SaveBtn = styled(MdSaveAlt)`
  cursor: pointer;
  color: ${props => props.status === 'save' ? '#056' : 'inherit'};
  outline: ${props => props.status === 'save' ? '2px solid #056' : 'none'};
  border-radius: 10px;
  &:hover{
    color: #056;
  }
`;

function MemeGenerator() {
  const { id } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);
  const [status, setStatus] = useState('text');
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (path === "/templates/:id") {
      getTemplate();
    }
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerStyle = 'circle';
  }, []);

  useEffect(() => {
    if (path === "/personal/meme-generator/:id") {
      if (userData !== null
        && Object.keys(userData).length > 0) {
        getEditingMeme();
      } else {
        history.push('/');
      }
    }
  }, [userData])

  // useEffect(() => {
  //   if (canvas !== '') {
  //     document.body.addEventListener('keydown', (e) => pressDelete(e, canvas));
  //   }
  // }, [canvas])

  const getEditingMeme = () => {
    getTheEditingMeme(userData.user_id, id).then((res) => {
      const canvasStatus = res.canvas_status;
      const canvasWidth = res.canvas_width;
      const canvasHeight = res.canvas_height;
      const canvas = new fabric.Canvas('c', {
        width: canvasWidth,
        height: canvasHeight,
        hoverCursor: 'grab', // 移動時鼠標顯示
        freeDrawingCursor: 'crosshair', // 畫畫模式時鼠標模式
        isDrawingMode: false, // 設置成 true 一秒變身小畫家
      });
      canvas.loadFromJSON(canvasStatus);
      dispatch(setCanvas(canvas));
    })
  }

  const getTemplate = () => {
    const image_id = id;
    let image_url;
    getTheTemplate(image_id).then((res) => {
      if (res) {
        image_url = res.image_url;
        getTemplateSize(image_url);
      }
    });
  }

  const getTemplateSize = (imgSrc) => {
    const newImg = new Image();
    newImg.crossOrigin = 'Anonymous';
    newImg.src = imgSrc;
    newImg.onload = function () {
      dispatch(setCanvas(initCanvas(newImg, this.width, this.height)));
    }
  }

  const initCanvas = (imgSrc, width, height) => {
    return new fabric.Canvas('c', {
      width: width,
      height: height,
      hoverCursor: 'grab', // 移動時鼠標顯示
      freeDrawingCursor: 'crosshair', // 畫畫模式時鼠標模式
      isDrawingMode: false, // 設置成 true 一秒變身小畫家
      backgroundImage: new fabric.Image(imgSrc)
    })
  }

  const deleteItem = (canvi) => {
    if (canvi.getActiveObject() === undefined || canvi.getActiveObject() === null) {
      alertWarning(undefined, '請先選擇物件再進行刪除！')
    } else {
      canvi.remove(canvi.getActiveObject());
    }
  }

  // const pressDelete = (e, canvi) => {
  //   if (e.keyCode === 46) {
  //     canvi.remove(canvi.getActiveObject());
  //   }
  // }

  // const changeBackgroundImage = (e, canvi) => {
  //   const file = e.target.files[0];
  //   const img = new Image();
  //   if (file) {
  //     img.src = window.URL.createObjectURL(file);
  //     img.onload = () => {
  //       const ratio = 600 / img.width;
  //       canvi.setBackgroundImage(img.src, canvi.renderAll.bind(canvi), {
  //         top: 0,
  //         left: 0,
  //         scaleX: ratio,
  //         scaleY: ratio,
  //       });
  //       canvi.setWidth(600);
  //       canvi.setHeight(img.height * ratio);
  //     }
  //   } else { return; }
  // }

  // const renderUploadImageButton = () => {
  //   return (
  //     <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start' }}>
  //       <Label0 htmlFor="uploadImage">更換背景圖片</Label0>
  //       <Input0 id="uploadImage" type="file" accept="image/*" onChange={(e) => { changeBackgroundImage(e, canvas); }} />
  //     </div>
  //   );
  // }

  return (
    <Container0 color={color}>
      <H1><Strong color={color}>迷因產生器</Strong></H1>
      <Container1>
        <Container2>
          <TextEditorBtn status={status} onClick={() => setStatus('text')} />
          <ShapeEditorBtn status={status} onClick={() => setStatus('shape')} />
          <DrawEditorBtn status={status} onClick={() => setStatus('draw')} />
          {/* {path === "/templates/:id" ? (userData === null || Object.keys(userData).length === 0 ? <ChangeImageBtn status={status} onClick={() => setStatus('image')} /> : "") : ""} */}
          <DeleteBtn onClick={() => deleteItem(canvas)} />
          <SaveBtn status={status} onClick={() => setStatus('save')} />
        </Container2>
        <Container3>
          {status === 'shape' ? <ShapeEditor /> : ""}
          {status === 'text' ? <TextEditor /> : ""}
          {status === 'draw' ? <DrawEditor /> : ""}
          {status === 'save' ? <SaveButtons /> : ""}
          {/* {status === 'image' ? renderUploadImageButton() : ""} */}
        </Container3>
        <div>
          {canvas === '' ? <h1>模板讀取中......</h1> : ""}
        </div>
        <canvas id="c"></canvas>
      </Container1>
    </Container0>
  );
}

export default MemeGenerator;