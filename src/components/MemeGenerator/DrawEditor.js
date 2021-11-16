import React from 'react';
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

    const updateRange = (divId, countDivId) => {
        const item = document.getElementById(divId).value;
        const count = document.getElementById(countDivId);
        count.innerHTML = '';
        count.innerHTML = item;
    }

    const drawing = (canvi) => {
        canvi.isDrawingMode = true;
        const color = document.getElementById('pencil-color').value;
        const width = document.getElementById('pencil-stroke-weight').value;
        canvi.freeDrawingBrush = new fabric.PencilBrush(canvi);
        canvi.freeDrawingBrush.color = color;
        canvi.freeDrawingBrush.width = width;
    }

    return (
        <div>
            <Container1><strong>選擇筆刷樣式</strong></Container1>
            <Container1>
                <label htmlFor="pencil-color"><RiSipLine /> 顏色　</label>
                <input type="color" id="pencil-color" defaultValue="#000000" />
            </Container1>
            <Container1>
                <label htmlFor="pencil-stroke-weight"><RiAlignCenter /> 粗細　</label>
                <Container2>
                    <Input0 type="range" id="pencil-stroke-weight" min="0" max="50" defaultValue="5" onMouseMove={() => updateRange('pencil-stroke-weight', 'pencil-stroke-weight-count')} onChange={() => updateRange('pencil-stroke-weight', 'pencil-stroke-weight-count')} />
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