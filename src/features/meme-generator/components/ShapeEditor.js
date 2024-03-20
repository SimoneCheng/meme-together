import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiPaintFill, RiEditBoxLine, RiAlignCenter } from 'react-icons/ri';
import { fabric } from 'fabric';

import {
    Container0,
    Container1,
    Input0,
    RectBtn,
    TriangleBtn,
    CircleBtn
} from './Styled/Common';
import {
    setShapeFillColor,
    setShapeStrokeColor,
    setShapeStrokeWidth
} from '../../../redux/actions';

function ShapeEditor() {
    const dispatch = useDispatch();
    const canvas = useSelector((state) => state.canvas);
    const shapeStyle = useSelector((state) => state.shapeStyleInCanvas);

    const getShapeData = (shape) => {
        const fill = shapeStyle.fillColor;
        const stroke = shapeStyle.strokeColor;
        const strokeWidth = parseInt(shapeStyle.strokeWidth);
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

    const changeShapeStyle = (canvi, style, value) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
                activeObject.set(style, value);
                canvi.renderAll();
            } else { return; }
        }
    }

    const changeFill = (e, canvi) => {
        dispatch(setShapeFillColor(e.target.value));
        changeShapeStyle(canvi, 'fill', e.target.value);
    }

    const changeStroke = (e, canvi) => {
        dispatch(setShapeStrokeColor(e.target.value));
        changeShapeStyle(canvi, 'stroke', e.target.value);
    }

    const changeStrokeWidth = (e, canvi) => {
        dispatch(setShapeStrokeWidth(e.target.value));
        changeShapeStyle(canvi, 'strokeWidth', parseInt(e.target.value));
    }

    return (
        <div>
            <Container0><strong>選擇物件樣式</strong></Container0>
            <Container0>
                <label htmlFor="shape-fill-color"><RiPaintFill /> 填滿　</label>
                <Input0 type="color" id="shape-fill-color" value={shapeStyle.fillColor} onChange={(e) => changeFill(e, canvas)} />
            </Container0>
            <Container0>
                <label htmlFor="shape-stroke-color"><RiEditBoxLine /> 外框　</label>
                <Input0 type="color" id="shape-stroke-color" value={shapeStyle.strokeColor} onChange={(e) => changeStroke(e, canvas)} />
            </Container0>
            <Container0>
                <label><RiAlignCenter /> 外框粗細　</label>
                <Container1>
                    <Input0 type="range" min="0" max="20" value={shapeStyle.strokeWidth} onChange={(e) => changeStrokeWidth(e, canvas) } />
                    <span>{shapeStyle.strokeWidth}</span>
                </Container1>
            </Container0>
            <div>
                <RectBtn onClick={() => addRect(canvas)} />
                <CircleBtn onClick={() => addCircle(canvas)} />
                <TriangleBtn onClick={() => addTriangle(canvas)} />
            </div>
        </div>
    )

}

export default ShapeEditor;