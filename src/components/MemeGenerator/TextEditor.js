import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { fabric } from 'fabric';
import { RiPaintFill, RiEditBoxLine, RiAlignCenter } from 'react-icons/ri';

import {
    Container0,
    Container1,
    Button0,
    Input0
} from '../Styled/MemeGenerator/Common';

function TextEditor() {
    const canvas = useSelector((state) => state.canvas);
    const fillInput = useRef(null);
    const strokeInput = useRef(null);
    const strokeWidthInput = useRef(null);

    const updateRange = (countDivId) => {
        const item = strokeWidthInput.current.value;
        const count = document.getElementById(countDivId);
        count.innerHTML = '';
        count.innerHTML = item;
        changeStrokeWidth(canvas);
    }

    const addText = (canvi) => {
        const fill = fillInput.current.value;
        const stroke = strokeInput.current.value;
        const strokeWidth = parseInt(strokeWidthInput.current.value);
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

    const changeFill = (canvi) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'i-text') {
                activeObject.set('fill', `${fillInput.current.value}`);
                canvi.renderAll();
            } else { return; }
        }
    }

    const changeStroke = (canvi) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'i-text') {
                activeObject.set('stroke', `${strokeInput.current.value}`);
                canvi.renderAll();
            } else { return; }
        }
    }

    const changeStrokeWidth = (canvi) => {
        const activeObject = canvi.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'i-text') {
                activeObject.set('strokeWidth', parseInt(strokeWidthInput.current.value));
                canvi.renderAll();
            } else { return; }
        }
    }

    return (
        <div>
            <Container0><strong>選擇字體樣式</strong></Container0>
            <Container0>
                <label htmlFor="text-fill-color"><RiPaintFill /> 填滿　</label>
                <Input0 type="color" id="text-fill-color" defaultValue="#ffffff" ref={fillInput} onChange={() => changeFill(canvas)} />
            </Container0>
            <Container0>
                <label htmlFor="text-stroke-color"><RiEditBoxLine /> 外框　</label>
                <Input0 type="color" id="text-stroke-color" defaultValue="#000000" ref={strokeInput} onChange={() => changeStroke(canvas)} />
            </Container0>
            <Container0>
                <label htmlFor="text-stroke-weight"><RiAlignCenter /> 外框粗細　</label>
                <Container1>
                    <Input0 type="range" id="text-stroke-weight" min="0" max="3" step="0.1" defaultValue="2" onChange={() => updateRange('text-stroke-weight-count')} ref={strokeWidthInput} />
                    <span id="text-stroke-weight-count">2</span>
                </Container1>
            </Container0>
            <div>
                <Button0 onClick={() => addText(canvas)}>新增文字方塊</Button0>
            </div>
        </div>
    )
}

export default TextEditor;