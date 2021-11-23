import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RiSipLine, RiAlignCenter } from 'react-icons/ri';
import { fabric } from 'fabric';

import {
    Container0,
    Container1,
    Input0,
    PencilBtn,
    PointerBtn
} from '../Styled/MemeGenerator/Common';

function DrawEditor() {
    const canvas = useSelector((state) => state.canvas);
    const colorInput = useRef(null);
    const widthInput = useRef(null);

    const updateRange = (countDivId) => {
        const item = widthInput.current.value;
        const count = document.getElementById(countDivId);
        count.innerHTML = '';
        count.innerHTML = item;
        changeDrawingBrushWidth(canvas);
    }

    const drawing = (canvi) => {
        canvi.isDrawingMode = true;
        const color = colorInput.current.value;
        const width = widthInput.current.value;
        canvi.freeDrawingBrush = new fabric.PencilBrush(canvi);
        canvi.freeDrawingBrush.color = color;
        canvi.freeDrawingBrush.width = width;
    }

    const changeDrawingBrushColor = (canvi) => {
        if (canvi.isDrawingMode) {
            const color = colorInput.current.value;
            canvi.freeDrawingBrush.color = color;
        }
    }

    const changeDrawingBrushWidth = (canvi) => {
        if (canvi.isDrawingMode) {      
            const width = widthInput.current.value;
            canvi.freeDrawingBrush.width = width;
        }
    }

    return (
        <div>
            <Container0><strong>選擇筆刷樣式</strong></Container0>
            <Container0>
                <label htmlFor="pencil-color"><RiSipLine /> 顏色　</label>
                <input type="color" id="pencil-color" defaultValue="#000000" ref={colorInput} onChange={() => changeDrawingBrushColor(canvas)} />
            </Container0>
            <Container0>
                <label><RiAlignCenter /> 粗細　</label>
                <Container1>
                    <Input0 type="range" min="0" max="50" defaultValue="5" onChange={() => updateRange('pencil-stroke-weight-count')} ref={widthInput} />
                    <span id="pencil-stroke-weight-count">2</span>
                </Container1>
            </Container0>
            <div>
                <PencilBtn onClick={() => drawing(canvas)} />
                <PointerBtn onClick={() => canvas.isDrawingMode = false} />
            </div>
        </div>
    )
}

export default DrawEditor;