import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fabric } from 'fabric';

import color from '../utlis/colorTheme';
import { getTheTemplate } from '../utlis/firebase';
import shapeIcon from '../image/outline_category_black_36dp.png';
import textIcon from '../image/outline_title_black_36dp.png';
import drawIcon from '../image/outline_border_color_black_36dp.png';
import deleteIcon from '../image/outline_delete_black_36dp.png';
import rectangleIcon from '../image/outline_rectangle_black_36dp.png';
import circleIcon from '../image/outline_circle_black_36dp.png';
import triangleIcon from '../image/outline_change_history_black_36dp.png';
import textBoxIcon from '../image/outline_format_shapes_black_36dp.png';
import pencilIcon from '../image/outline_mode_edit_black_36dp.png';

const Container0 = styled.div`
  text-align: center;
  height: auto;
  background-color: ${props => props.color.color1.colorCode};
  padding: 50px;
`;

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color4.colorCode};
  color: black;
`;

function MemeGenerator() {
  const [canvas, setCanvas] = useState('');
  const [shapeEditorIsDisplayed, setShapeEditorIsDisplayed] = useState(true);
  const [textEditorIsDisplayed, setTextEditorIsDisplayed] = useState(true);
  const [drawEditorIsDisplayed, setDrawEditorIsDisplayed] = useState(true);
  const allTemplates = useSelector((state) => state.allTemplates);

  useEffect(() => {
    getTemplate();
  }, []);

  const getTemplate = () => {
    const url = new URL(window.location.href);
    const image_id = url.searchParams.get('id');
    let image_url;
    if (allTemplates.length !== 0 && image_id !== null) {
      const template = allTemplates.filter((item) => item.image_id === parseInt(image_id));
      image_url = template[0].image_url
      getTemplateSize(image_url);
    } else if (allTemplates.length === 0 && image_id !== null) {
      getTheTemplate(image_id).then((res) => {
        image_url = res.image_url;
        getTemplateSize(image_url);
      });
    } else {
      return;
    }
  }

  const getTemplateSize = (imgSrc) => {
    const newImg = new Image();
    newImg.crossOrigin = 'Anonymous';
    newImg.src = imgSrc;
    newImg.onload = function () {
      setCanvas(initCanvas(newImg, this.width, this.height));
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

  const controlDisplayOrNot = (status, setStatus, className) => {
    const item = document.getElementsByClassName(className)[0];
    if (status === false) {
      item.classList.add('hidden');
    } else {
      item.classList.remove('hidden');
    }
    status ? setStatus(false) : setStatus(true);
  }

  const getShapeData = (shape) => {
    const fill = document.getElementById('shape-fill-color').value;
    const stroke = document.getElementById('shape-stroke-color').value;
    const strokeWidth = parseInt(document.getElementById('shape-stroke-weight').value);
    const initData = { height: 200, width: 150, radius: 100 };
    const { height, width, radius } = initData;
    const shapeData = { height, width, fill, stroke, strokeWidth };
    switch (shape) {
      case 'circle':
        shapeData.radius = radius;
        break;
      default:
        break;
    }
    return shapeData;
  }

  const addRect = (canvi) => {
    const rect = new fabric.Rect(getShapeData());
    canvi.add(rect);
    canvi.renderAll();
  }

  const addCircle = (canvi) => {
    const rect = new fabric.Circle(getShapeData('circle'));
    canvi.add(rect);
    canvi.renderAll();
  }

  const addTriangle = (canvi) => {
    const rect = new fabric.Triangle(getShapeData());
    canvi.add(rect);
    canvi.renderAll();
  }

  const updateRange = (divId, countDivId) => {
    const item = document.getElementById(divId).value;
    const count = document.getElementById(countDivId);
    count.innerHTML = '';
    count.innerHTML = item;
  }

  const addText = (canvi) => {
    const fill = document.getElementById('text-fill-color').value;
    const stroke = document.getElementById('text-stroke-color').value;
    const strokeWidth = parseInt(document.getElementById('text-stroke-weight').value);
    const text = new fabric.IText('請輸入文字', {
      top: 0,
      left: 0,
      fill,
      stroke,
      strokeWidth,
      fontWeight: 800,
      fontFamily: '微軟正黑'
    });
    canvi.add(text);
    canvi.renderAll();
  }

  const drawing = (canvi) => {
    canvi.isDrawingMode ? canvi.isDrawingMode = false : canvi.isDrawingMode = true;
    if (canvi.isDrawingMode) {
      const color = document.getElementById('pencil-color').value;
      const width = document.getElementById('pencil-stroke-weight').value;
      canvi.freeDrawingBrush = new fabric.PencilBrush(canvi);
      canvi.freeDrawingBrush.color = color;
      canvi.freeDrawingBrush.width = width;
    }
  }

  const deleteItem = (canvi) => {
    canvi.remove(canvi.getActiveObject());
  }

  const downloadImage = (canvi, imageFormat) => {
    const link = document.createElement("a");
    link.href = canvi.toDataURL();
    link.download = `meme-generator-${new Date().getTime()}.${imageFormat}`;
    link.click();
  }

  const changeBackgroundImage = (e, canvi) => {
    const file = e.target.files[0];
    const img = new Image();
    if (file) {
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const ratio = 600 / img.width;
        canvi.setBackgroundImage(img.src, canvi.renderAll.bind(canvi), {
          top: 0,
          left: 0,
          scaleX: ratio,
          scaleY: ratio,
        });
        canvi.setWidth(600);
        canvi.setHeight(img.height * ratio);
      }
    } else { return; }
  }

  return (
    <Container0 color={color}>
      <H1><Strong color={color}>迷因產生器</Strong></H1>
      <div>
        <button onClick={() => controlDisplayOrNot(shapeEditorIsDisplayed, setShapeEditorIsDisplayed, 'shape-editor')}><img alt="shapeIcon" src={shapeIcon}></img></button>
        <button onClick={() => controlDisplayOrNot(textEditorIsDisplayed, setTextEditorIsDisplayed, 'text-editor')}><img alt="textIcon" src={textIcon}></img></button>
        <button onClick={() => controlDisplayOrNot(drawEditorIsDisplayed, setDrawEditorIsDisplayed, 'draw-editor')}><img alt="drawIcon" src={drawIcon}></img></button>
        <button onClick={() => deleteItem(canvas)}><img alt="deleteIcon" src={deleteIcon}></img></button>
      </div>
      <div className='shape-editor hidden'>
        <div>
          <label htmlFor="shape-fill-color">填滿</label>
          <input type="color" id="shape-fill-color" defaultValue="#000000" />
        </div>
        <div>
          <label htmlFor="shape-stroke-color">外框</label>
          <input type="color" id="shape-stroke-color" defaultValue="#ffffff" />
        </div>
        <div>
          <label htmlFor="shape-stroke-weight">外框粗細</label>
          <input type="range" id="shape-stroke-weight" min="0" max="20" defaultValue="0" onMouseMove={() => updateRange('shape-stroke-weight', 'shape-stroke-weight-count')} onChange={() => updateRange('shape-stroke-weight', 'shape-stroke-weight-count')} />
          <span id="shape-stroke-weight-count">0</span>
        </div>
        <button onClick={() => addRect(canvas)}><img alt="rectangleIcon" src={rectangleIcon}></img></button>
        <button onClick={() => addCircle(canvas)}><img alt="circleIcon" src={circleIcon}></img></button>
        <button onClick={() => addTriangle(canvas)}><img alt="triangleIcon" src={triangleIcon}></img></button>
      </div>
      <div className='text-editor hidden'>
        <div>
          <label htmlFor="text-fill-color">填滿</label>
          <input type="color" id="text-fill-color" defaultValue="#ffffff" />
        </div>
        <div>
          <label htmlFor="text-stroke-color">外框</label>
          <input type="color" id="text-stroke-color" defaultValue="#000000" />
        </div>
        <div>
          <label htmlFor="text-stroke-weight">外框粗細</label>
          <input type="range" id="text-stroke-weight" min="0" max="3" step="0.1" defaultValue="2" onMouseMove={() => updateRange('text-stroke-weight', 'text-stroke-weight-count')} onChange={() => updateRange('text-stroke-weight', 'text-stroke-weight-count')} />
          <span id="text-stroke-weight-count">2</span>
        </div>
        <button onClick={() => addText(canvas)}><img alt="textBoxIcon" src={textBoxIcon}></img></button>
      </div>
      <div className='draw-editor hidden'>
        <div>
          <label htmlFor="pencil-color">筆刷顏色</label>
          <input type="color" id="pencil-color" defaultValue="#000000" />
        </div>
        <div>
          <label htmlFor="pencil-stroke-weight">筆刷粗細</label>
          <input type="range" id="pencil-stroke-weight" min="0" max="50" defaultValue="5" onMouseMove={() => updateRange('pencil-stroke-weight', 'pencil-stroke-weight-count')} onChange={() => updateRange('pencil-stroke-weight', 'pencil-stroke-weight-count')} />
          <span id="pencil-stroke-weight-count">2</span>
        </div>
        <button onClick={() => drawing(canvas)}><img alt="pencilIcon" src={pencilIcon}></img></button>
      </div>
      <div>
        <span>上傳一張圖片：</span>
        <input id="uploadImage" type="file" accept="image/*" onChange={(e) => { changeBackgroundImage(e, canvas); }} />
      </div>
      <canvas id="c"></canvas>
      <button onClick={() => downloadImage(canvas, 'png')}>Download in png</button>
      <button onClick={() => downloadImage(canvas, 'jpg')}>Download in jpg</button>
    </Container0>
  );
}

export default MemeGenerator;