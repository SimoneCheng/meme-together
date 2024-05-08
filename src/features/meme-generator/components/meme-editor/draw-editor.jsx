import { useState } from 'react';
import { fabric } from '@/libs/fabric';
import {
  RiSipLine,
  RiAlignCenter
} from 'react-icons/ri';
import {
  FaPencilAlt,
  FaMousePointer
} from 'react-icons/fa';
import { Button } from '@/components/button';
import {
  StyledContainer,
  StyledInput,
  StyledEditorContainer
} from './meme-editor.style';

const DrawEditor = ({ canvas }) => {
  const [color, setColor] = useState('#000000');
  const [width, setWidth] = useState('2');

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (!canvas.isDrawingMode) return;
    canvas.freeDrawingBrush.color = value;
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    setWidth(value);
    if (!canvas.isDrawingMode) return;
    canvas.freeDrawingBrush.width = parseInt(value);
  };

  const drawing = () => {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = width;
  };

  return (
    <StyledEditorContainer>
      <StyledContainer>
        <strong>選擇筆刷樣式</strong>
      </StyledContainer>
      <StyledContainer>
        <label htmlFor="pencil-color">
          <RiSipLine />
          顏色
        </label>
        <input
          type="color"
          id="pencil-color"
          value={color}
          onChange={handleColorChange}
        />
      </StyledContainer>
      <label>
        <RiAlignCenter />
        粗細
      </label>
      <StyledContainer>
        <StyledInput
          type="range"
          min="1"
          max="50"
          value={width}
          onChange={handleWidthChange}
        />
        <div id="pencil-stroke-weight-count">
          {width}
        </div>
      </StyledContainer>
      <div>
        <Button
          style={{ marginRight: '8px' }}
          type="button"
          onClick={drawing}
        >
          <FaPencilAlt />
        </Button>
        <Button
          type="button"
          onClick={() => canvas.isDrawingMode = false}
        >
          <FaMousePointer />
        </Button>
      </div>
    </StyledEditorContainer>
  )
};

export default DrawEditor;
