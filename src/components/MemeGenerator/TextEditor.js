import React from 'react';
import { useSelector } from 'react-redux';
import { fabric } from 'fabric';
import styled from 'styled-components';
import { RiPaintFill, RiEditBoxLine, RiAlignCenter } from 'react-icons/ri';

const Container1 = styled.div`
  margin-bottom: 30px;
  white-space: pre-line;
`;

const Container2 = styled.div`
  margin-top: 8px
`;

const Button0 = styled.button`
  border: none;
  border-radius: 10px;
  outline: 2px solid #ccc;
  font-size: 1rem;
  padding: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover{
      outline: 3px solid #056;
  }
`;

const Input0 = styled.input`
  cursor: pointer;
`;

function TextEditor(props) {
    const canvas = useSelector((state) => state.canvas);

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
            fontFamily: "Arial"
        });
        canvi.add(text);
        canvi.setActiveObject(text);
        canvi.renderAll();
    }

    return (
        <div>
            <Container1><strong>選擇字體樣式</strong></Container1>
            <Container1>
                <label htmlFor="text-fill-color"><RiPaintFill /> 填滿　</label>
                <Input0 type="color" id="text-fill-color" defaultValue="#ffffff" />
            </Container1>
            <Container1>
                <label htmlFor="text-stroke-color"><RiEditBoxLine /> 外框　</label>
                <Input0 type="color" id="text-stroke-color" defaultValue="#000000" />
            </Container1>
            <Container1>
                <label htmlFor="text-stroke-weight"><RiAlignCenter /> 外框粗細　</label>
                <Container2>
                    <Input0 type="range" id="text-stroke-weight" min="0" max="3" step="0.1" defaultValue="2" onMouseMove={() => updateRange('text-stroke-weight', 'text-stroke-weight-count')} onChange={() => updateRange('text-stroke-weight', 'text-stroke-weight-count')} />
                    <span id="text-stroke-weight-count">2</span>
                </Container2>
            </Container1>
            <div>
                <Button0 onClick={() => addText(canvas)}>新增文字方塊</Button0>
            </div>
        </div>
    )
}

export default TextEditor;