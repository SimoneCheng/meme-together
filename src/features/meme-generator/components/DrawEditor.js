import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiSipLine, RiAlignCenter } from 'react-icons/ri';
import { fabric } from 'fabric';

import {
    Container0,
    Container1,
    Input0,
    PencilBtn,
    PointerBtn
} from './Styled/Common';
import {
    setDrawingColor,
    setDrawingWidth
} from '../../../redux/actions';

function DrawEditor() {
    const dispatch = useDispatch();
    const canvas = useSelector((state) => state.canvas);
    const drawingStyle = useSelector((state) => state.drawingStyleInCanvas);

    const drawing = (canvi) => {
        canvi.isDrawingMode = true;
        canvi.freeDrawingBrush = new fabric.PencilBrush(canvi);
        canvi.freeDrawingBrush.color = drawingStyle.color;
        canvi.freeDrawingBrush.width = drawingStyle.width;
    }

    const changeDrawingBrushColor = (e, canvi) => {
        dispatch(setDrawingColor(e.target.value));
        if (canvi.isDrawingMode) {
            canvi.freeDrawingBrush.color = e.target.value;
        }
    }

    const changeDrawingBrushWidth = (e, canvi) => {
        dispatch(setDrawingWidth(e.target.value));
        if (canvi.isDrawingMode) {      
            canvi.freeDrawingBrush.width = parseInt(e.target.value);
        }
    }

    return (
        <div>
            <Container0><strong>選擇筆刷樣式</strong></Container0>
            <Container0>
                <label htmlFor="pencil-color"><RiSipLine /> 顏色　</label>
                <input type="color" id="pencil-color" value={drawingStyle.color} onChange={(e) => changeDrawingBrushColor(e, canvas)} />
            </Container0>
            <Container0>
                <label><RiAlignCenter /> 粗細　</label>
                <Container1>
                    <Input0 type="range" min="1" max="50" value={drawingStyle.width} onChange={(e) => changeDrawingBrushWidth(e, canvas)} />
                    <span id="pencil-stroke-weight-count">{drawingStyle.width}</span>
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