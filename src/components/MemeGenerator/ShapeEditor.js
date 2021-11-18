import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    IoTriangleOutline,
    IoSquareOutline,
    IoRadioButtonOffOutline
} from 'react-icons/io5';
import { RiPaintFill, RiEditBoxLine, RiAlignCenter } from 'react-icons/ri';
import styled from 'styled-components';
import { fabric } from 'fabric';

const Container1 = styled.div`
  margin-bottom: 30px;
  white-space: pre-line;
`;

const Container2 = styled.div`
  margin-top: 8px
`;

const Input0 = styled.input`
  cursor: pointer;
`;

const RectBtn = styled(IoSquareOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  margin-right: 10px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
      border: 2px solid #056;
  }
`;

const TriangleBtn = styled(IoTriangleOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
      border: 2px solid #056;
  }
`;

const CircleBtn = styled(IoRadioButtonOffOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  margin-right: 10px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
      border: 2px solid #056;
  }
`;

function ShapeEditor() {
    const canvas = useSelector((state) => state.canvas);
    const fillInput = useRef(null);
    const strokeInput = useRef(null);
    const strokeWidthInput = useRef(null);

    const getShapeData = (shape) => {
        const fill = fillInput.current.value;
        const stroke = strokeInput.current.value;
        const strokeWidth = parseInt(strokeWidthInput.current.value);
        const initData = { left: 50, top: 50, height: 100, width: 100, radius: 50 };
        const { height, width, radius, top, left } = initData;
        const shapeData = { top, left, height, width, fill, stroke, strokeWidth };
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
        canvi.setActiveObject(rect);
        canvi.renderAll();
    }

    const addCircle = (canvi) => {
        const circle = new fabric.Circle(getShapeData('circle'));
        canvi.add(circle);
        canvi.setActiveObject(circle);
        canvi.renderAll();
    }

    const addTriangle = (canvi) => {
        const triangle = new fabric.Triangle(getShapeData());
        canvi.add(triangle);
        canvi.setActiveObject(triangle);
        canvi.renderAll();
    }

    const updateRange = (countDivId) => {
        const item = strokeWidthInput.current.value;
        const count = document.getElementById(countDivId);
        count.innerHTML = '';
        count.innerHTML = item;
        changeStrokeWidth(canvas);
    }

    const changeFill = (canvi) => {
        const activeObject = canvi.getActiveObject();
        console.log(activeObject.type);
        if (activeObject) {
            if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
                activeObject.set('fill', `${fillInput.current.value}`);
                canvi.renderAll();
            } else { return; }
        }
    }

    const changeStroke = (canvi) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
                activeObject.set('stroke', `${strokeInput.current.value}`);
                canvi.renderAll();
            } else { return; }
        }
    }

    const changeStrokeWidth = (canvi) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
                activeObject.set('strokeWidth', parseInt(strokeWidthInput.current.value));
                canvi.renderAll();
            } else { return; }
        }
    }

    return (
        <div>
            <Container1><strong>選擇物件樣式</strong></Container1>
            <Container1>
                <label htmlFor="shape-fill-color"><RiPaintFill /> 填滿　</label>
                <Input0 type="color" id="shape-fill-color" defaultValue="#000000" ref={fillInput} onChange={() => changeFill(canvas)} />
            </Container1>
            <Container1>
                <label htmlFor="shape-stroke-color"><RiEditBoxLine /> 外框　</label>
                <Input0 type="color" id="shape-stroke-color" defaultValue="#ffffff" ref={strokeInput} onChange={() => changeStroke(canvas)} />
            </Container1>
            <Container1>
                <label><RiAlignCenter /> 外框粗細　</label>
                <Container2>
                    <Input0 type="range" min="0" max="20" defaultValue="0" onChange={() => { updateRange('shape-stroke-weight-count'); }} ref={strokeWidthInput} />
                    <span id="shape-stroke-weight-count">0</span>
                </Container2>
            </Container1>
            <div>
                <RectBtn onClick={() => addRect(canvas)} />
                <CircleBtn onClick={() => addCircle(canvas)} />
                <TriangleBtn onClick={() => addTriangle(canvas)} />
            </div>
        </div>
    )

}

export default ShapeEditor;