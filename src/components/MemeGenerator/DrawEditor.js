import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaPencilAlt, FaMousePointer } from 'react-icons/fa';
import { RiSipLine, RiAlignCenter } from 'react-icons/ri';
import { fabric } from 'fabric';
import styled from 'styled-components';

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

const PencilBtn = styled(FaPencilAlt)`
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

const PointerBtn = styled(FaMousePointer)`
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
            <Container1><strong>選擇筆刷樣式</strong></Container1>
            <Container1>
                <label htmlFor="pencil-color"><RiSipLine /> 顏色　</label>
                <input type="color" id="pencil-color" defaultValue="#000000" ref={colorInput} onChange={() => changeDrawingBrushColor(canvas)} />
            </Container1>
            <Container1>
                <label><RiAlignCenter /> 粗細　</label>
                <Container2>
                    <Input0 type="range" min="0" max="50" defaultValue="5" onChange={() => updateRange('pencil-stroke-weight-count')} ref={widthInput} />
                    <span id="pencil-stroke-weight-count">2</span>
                </Container2>
            </Container1>
            <div>
                <PencilBtn onClick={() => drawing(canvas)} />
                <PointerBtn onClick={() => canvas.isDrawingMode = false} />
            </div>
        </div>
    )
}

export default DrawEditor;