import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from 'fabric';
import { RiPaintFill, RiEditBoxLine, RiAlignCenter } from 'react-icons/ri';

import {
    Container0,
    Container1,
    Button0,
    Input0
} from './Styled/Common';
import {
    setTextFillColor,
    setTextStrokeColor,
    setTextStrokeWidth
} from '../../../redux/actions';

function TextEditor() {
    const dispatch = useDispatch();
    const canvas = useSelector((state) => state.canvas);
    const textStyle = useSelector((state) => state.textStyleInCanvas);

    const addText = (canvi) => {
        const fill = textStyle.fillColor;
        const stroke = textStyle.strokeColor;
        const strokeWidth = parseInt(textStyle.strokeWidth);
        const text = new fabric.IText('請輸入文字', {
            top: 50,
            left: 50,
            fill,
            stroke,
            strokeWidth,
            fontWeight: 800,
            fontSize: 60,
            fontFamily: "Arial"
        });
        canvi.add(text);
        canvi.setActiveObject(text);
        canvi.renderAll();
    }

    const changeTextStyle = (canvi, type, style, value) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === type) {
                activeObject.set(style, value);
                canvi.renderAll();
            } else { return; }
        }

    }

    const changeFill = (e, canvi) => {
        dispatch(setTextFillColor(e.target.value));
        changeTextStyle(canvi, 'i-text', 'fill', e.target.value);
    }

    const changeStroke = (e, canvi) => {
        dispatch(setTextStrokeColor(e.target.value));
        changeTextStyle(canvi, 'i-text', 'stroke', e.target.value);
    }

    const changeStrokeWidth = (e, canvi) => {
        dispatch(setTextStrokeWidth(e.target.value));
        changeTextStyle(canvi, 'i-text', 'strokeWidth', parseInt(e.target.value));
    }

    return (
        <div>
            <Container0><strong>選擇字體樣式</strong></Container0>
            <Container0>
                <label htmlFor="text-fill-color"><RiPaintFill /> 填滿　</label>
                <Input0 type="color" id="text-fill-color" value={textStyle.fillColor} onChange={(e) => changeFill(e, canvas)} />
            </Container0>
            <Container0>
                <label htmlFor="text-stroke-color"><RiEditBoxLine /> 外框　</label>
                <Input0 type="color" id="text-stroke-color" value={textStyle.strokeColor} onChange={(e) => changeStroke(e, canvas)} />
            </Container0>
            <Container0>
                <label htmlFor="text-stroke-weight"><RiAlignCenter /> 外框粗細　</label>
                <Container1>
                    <Input0 type="range" id="text-stroke-weight" min="0" max="3" step="0.1" value={textStyle.strokeWidth} onChange={(e) => { changeStrokeWidth(e, canvas); }} />
                    <span>{textStyle.strokeWidth}</span>
                </Container1>
            </Container0>
            <div>
                <Button0 onClick={() => addText(canvas)}>新增文字方塊</Button0>
            </div>
        </div>
    )
}

export default TextEditor;