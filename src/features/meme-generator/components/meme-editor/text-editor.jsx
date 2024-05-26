import { useState } from 'react';
import { fabric } from '@/libs/fabric';
import {
  RiPaintFill,
  RiEditBoxLine,
  RiAlignCenter
} from 'react-icons/ri/index.esm';
import { Button } from '@/components/button';
import {
  StyledContainer,
  StyledInput,
  StyledEditorContainer
} from './meme-editor.style';

const TextEditor = ({ canvas }) => {
  const [fillColor, setFillColor] = useState('#ffffff');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState('2');

  const handleFillColorChange = (e) => {
    const value = e.target.value
    setFillColor(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'i-text') {
      activeObject.set('fill', value);
      canvas.renderAll();
    }
  };

  const handleStrokeColorChange = (e) => {
    const value = e.target.value;
    setStrokeColor(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'i-text') {
      activeObject.set('stroke', value);
      canvas.renderAll();
    }
  };

  const handleStrokeWidthChange = (e) => {
    const value = e.target.value;
    setStrokeWidth(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'i-text') {
      activeObject.set('strokeWidth', parseInt(value));
      canvas.renderAll();
    }
  };

  const handleAddText = () => {
    const text = new fabric.IText('請輸入文字', {
      top: 50,
      left: 50,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: parseInt(strokeWidth),
      fontWeight: 800,
      fontSize: 60,
      fontFamily: "Arial"
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  return (
    <StyledEditorContainer>
      <StyledContainer>
        <strong>選擇字體樣式</strong>
      </StyledContainer>
      <StyledContainer>
        <label htmlFor="text-fill-color">
          <RiPaintFill />
          填滿
        </label>
        <StyledInput
          type="color"
          id="text-fill-color"
          value={fillColor}
          onChange={handleFillColorChange}
        />
      </StyledContainer>
      <StyledContainer>
        <label htmlFor="text-stroke-color">
          <RiEditBoxLine />
          外框
        </label>
        <StyledInput
          type="color"
          id="text-stroke-color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
        />
      </StyledContainer>
      <label htmlFor="text-stroke-weight">
        <RiAlignCenter />
        外框粗細
      </label>
      <StyledContainer>
        <StyledInput
          type="range"
          id="text-stroke-weight"
          min="0"
          max="3"
          step="0.1"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
        <div>
          {strokeWidth}
        </div>
      </StyledContainer>
      <div>
        <Button
          type="button"
          onClick={handleAddText}
        >
          新增文字方塊
        </Button>
      </div>
    </StyledEditorContainer>
  );
};

export default TextEditor;
