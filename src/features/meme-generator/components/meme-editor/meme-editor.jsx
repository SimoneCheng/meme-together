
import { useState } from 'react';
import { FaShapes } from 'react-icons/fa';
import {
  MdTextFields,
  MdEdit
} from 'react-icons/md';
import TextEditor from './text-editor';
import ShapeEditor from './shape-editor';
import DrawEditor from './draw-editor';
import {
  StyledButton,
  StyledButtonsContainer
} from './meme-editor.style';

const MemeEditor = ({ canvas }) => {
  const [activeEditor, setActiveEditor] = useState('text');
  return (
    <>
      <StyledButtonsContainer>
        <StyledButton
          type="button"
          isActive={activeEditor === 'text'}
          onClick={() => setActiveEditor('text')}
        >
          <MdTextFields size="32px" />
        </StyledButton>
        <StyledButton
          type="button"
          isActive={activeEditor === 'shape'}
          onClick={() => setActiveEditor('shape')}
        >
          <FaShapes size="32px" />
        </StyledButton>
        <StyledButton
          type="button"
          isActive={activeEditor === 'draw'}
          onClick={() => setActiveEditor('draw')}
        >
          <MdEdit size="32px" />
        </StyledButton>
      </StyledButtonsContainer>
      <div>
        {activeEditor === 'text' && <TextEditor canvas={canvas} />}
        {activeEditor === 'shape' && <ShapeEditor canvas={canvas} />}
        {activeEditor === 'draw' && <DrawEditor canvas={canvas} />}
      </div>
    </>
  )
};

export default MemeEditor;
