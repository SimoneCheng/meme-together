import { useState } from 'react';
import { fabric } from '@/libs/fabric';
import {
  RiPaintFill,
  RiEditBoxLine,
  RiAlignCenter
} from 'react-icons/ri';
import {
  IoTriangleOutline,
  IoSquareOutline,
  IoRadioButtonOffOutline
} from 'react-icons/io5';
import { Button } from '@/components/button';
import {
  StyledContainer,
  StyledInput,
  StyledEditorContainer,
  StyledLabel
} from './meme-editor.style';

const defaultShapeData = {
  left: 50,
  top: 50,
  height: 100,
  width: 100,
};

const ShapeEditor = ({ canvas }) => {
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#ffffff');
  const [strokeWidth, setStrokeWidth] = useState('2');

  const handleFillColorChange = (e, canvas) => {
    const value = e.target.value;
    setFillColor(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
      activeObject.set('fill', value);
      canvas.renderAll();
    }
  };

  const handleStrokeColorChange = (e) => {
    const value = e.target.value;
    setStrokeColor(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
      activeObject.set('stroke', value);
      canvas.renderAll();
    }
  };

  const handleStrokeWidthChange = (e) => {
    const value = e.target.value;
    setStrokeWidth(value);
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle') {
      activeObject.set('strokeWidth', parseInt(value));
      canvas.renderAll();
    }
  };

  const addRect = () => {
    const rect = new fabric.Rect({
      ...defaultShapeData,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: parseInt(strokeWidth)
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      ...defaultShapeData,
      radius: 50,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: parseInt(strokeWidth),
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      ...defaultShapeData,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: parseInt(strokeWidth)
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
  };

  return (
    <StyledEditorContainer>
      <StyledContainer>
        <strong>選擇物件樣式</strong>
      </StyledContainer>
      <StyledContainer>
        <StyledLabel htmlFor="shape-fill-color">
          <RiPaintFill />
          填滿
        </StyledLabel>
        <StyledInput
          type="color"
          id="shape-fill-color"
          value={fillColor}
          onChange={handleFillColorChange}
        />
      </StyledContainer>
      <StyledContainer>
        <StyledLabel htmlFor="shape-stroke-color">
          <RiEditBoxLine />
          外框
        </StyledLabel>
        <StyledInput
          type="color"
          id="shape-stroke-color"
          value={strokeColor}
          onChange={handleStrokeColorChange}
        />
      </StyledContainer>
      <label>
        <RiAlignCenter />
        外框粗細
      </label>
      <StyledContainer>
        <StyledInput
          type="range"
          min="0"
          max="20"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
        <div>
          {strokeWidth}
        </div>
      </StyledContainer>
      <div>
        <Button
          style={{ marginRight: '8px' }}
          type="button"
          onClick={addRect}
        >
          <IoSquareOutline />
        </Button>
        <Button
          style={{ marginRight: '8px' }}
          type="button"
          onClick={addCircle}
        >
          <IoRadioButtonOffOutline />
        </Button>
        <Button
          type="button"
          onClick={addTriangle}
        >
          <IoTriangleOutline />
        </Button>
      </div>
    </StyledEditorContainer>
  );
};

export default ShapeEditor;
