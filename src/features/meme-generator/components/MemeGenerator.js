import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { fabric } from 'fabric';

import { setCanvas } from '../../../redux/actions';
import color from './Styled/colorTheme';
import {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  H1,
  Strong,
  TextEditorBtn,
  ShapeEditorBtn,
  DrawEditorBtn
} from './Styled/MemeGenerator';
import { getTheTemplate, getTheEditingMeme } from '../../../utlis/firebase';
import {
  setTextFillColor,
  setTextStrokeColor,
  setTextStrokeWidth,
  setShapeFillColor,
  setShapeStrokeColor,
  setShapeStrokeWidth,
  setDrawingColor,
  setDrawingWidth
} from '../../../redux/actions';
import TextEditor from './TextEditor';
import ShapeEditor from './ShapeEditor';
import DrawEditor from './DrawEditor';
import SaveButtons from './SaveButtons';

function MemeGenerator() {
  const { id } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.canvas);
  const [status, setStatus] = useState('text');
  const userData = useSelector((state) => state.userData);

  // revise prototype in fabric.js
  const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  const img = document.createElement('img');
  img.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = 'blue';
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 0,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 28
  });

  function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (path === "/templates/:id") {
      getTemplate();
    }
  }, []);

  useEffect(() => {
    if (path === "/templates/:id") {
      if (canvas !== '' && canvas !== null) {
        initObject(canvas);
      }
      if (canvas === null) {
        history.replace('/404');
      }
    }
    if (path === "/personal/meme-generator/:id") {
      if (canvas === null) {
        history.replace('/404');
      }
    }
  }, [canvas])

  useEffect(() => {
    if (path === "/personal/meme-generator/:id") {
      if (userData === null) {
        history.push('/');
      } else if (userData !== null
        && Object.keys(userData).length > 0) {
        getEditingMeme();
      }
    }
  }, [userData])

  useEffect(() => {
    return () => {
      dispatch(setTextFillColor('#ffffff'));
      dispatch(setTextStrokeColor('#000000'));
      dispatch(setTextStrokeWidth('2'));
      dispatch(setShapeFillColor('#000000'));
      dispatch(setShapeStrokeColor('#ffffff'));
      dispatch(setShapeStrokeWidth('2'));
      dispatch(setDrawingColor('#000000'));
      dispatch(setDrawingWidth('2'));
    }
  }, [])

  const getEditingMeme = () => {
    getTheEditingMeme(userData.user_id, id)
      .then((res) => {
        if (res) {
          const canvasStatus = res.canvas_status;
          const canvasWidth = res.canvas_width;
          const canvasHeight = res.canvas_height;
          const canvas = new fabric.Canvas('c', {
            width: canvasWidth > 600 ? 600 : canvasWidth,
            height: canvasWidth > 600 ? canvasHeight * (600 / canvasWidth) : canvasHeight,
            hoverCursor: 'grab',
            freeDrawingCursor: 'crosshair',
            isDrawingMode: false,
          });
          canvas.loadFromJSON(canvasStatus);
          dispatch(setCanvas(canvas));
        } else {
          dispatch(setCanvas(null));
        }
      })
  }

  const getTemplate = () => {
    const image_id = id;
    let image_url;
    getTheTemplate(image_id).then((res) => {
      if (res) {
        image_url = res.image_url;
        getTemplateSize(image_url);
      } else {
        dispatch(setCanvas(null));
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
      width: 600,
      height: height * (600 / width),
      hoverCursor: 'grab',
      freeDrawingCursor: 'crosshair',
      isDrawingMode: false,
      backgroundImage: new fabric.Image(imgSrc, {
        scaleX: 600 / width,
        scaleY: 600 / width
      }),
    })
  }

  const initObject = (canvi) => {
    const text = new fabric.IText('請輸入文字', {
      top: 50,
      left: 50,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      fontWeight: 800,
      fontSize: 60,
      fontFamily: "Arial"
    })
    canvi.add(text);
    canvi.setActiveObject(text);
    canvi.renderAll();
  }

  return (
    <>
      <Container0 color={color}>
        <H1><Strong color={color}>迷因產生器</Strong></H1>
        <Container5>
          <Container1>
            <div style={{ 'display': 'flex', 'alignItems': 'flex-start' }}>
              <Container2>
                <TextEditorBtn status={status} onClick={() => setStatus('text')} />
                <ShapeEditorBtn status={status} onClick={() => setStatus('shape')} />
                <DrawEditorBtn status={status} onClick={() => setStatus('draw')} />
              </Container2>
              <Container3>
                {status === 'shape' ? <ShapeEditor /> : ""}
                {status === 'text' ? <TextEditor /> : ""}
                {status === 'draw' ? <DrawEditor /> : ""}
              </Container3>
            </div>
            <div>
              {canvas === '' ? <h1>模板讀取中......</h1> : ""}
            </div>
            <Container6 canvas={canvas}>
              <canvas id="c"></canvas>
            </Container6>
          </Container1>
          <Container4>
            <SaveButtons />
          </Container4>
        </Container5>
      </Container0>
    </>
  );
}

export default MemeGenerator;