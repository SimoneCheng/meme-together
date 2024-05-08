import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fabric } from 'fabric';
import { useAuthId } from '@/features/auth';
import {
  getTheEditingMeme,
  MemeEditor
} from '@/features/meme-generator';
import {
  StyledWrapper,
  StyledH1,
  StyledStrong,
  StyledContainer
} from './style';

const PersonalMemeGeneratorPage = () => {
  const { id } = useParams();
  const [authId] = useAuthId();
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!id || !authId) return;
    getTheEditingMeme({
      userId: authId,
      docId: id
    }).then((res) => {
      // init canvas
      if (!res) return;
      const canvas = new fabric.Canvas('c', {
        width: res.canvas_width > 600 ? 600 : res.canvas_width,
        height: res.canvas_width > 600 ? res.canvas_height * (600 / res.canvas_width) : res.canvas_height,
        hoverCursor: 'grab',
        freeDrawingCursor: 'crosshair',
        isDrawingMode: false,
      });
      canvas.loadFromJSON(res.canvas_status);
      setCanvas(canvas);
    });
  }, [authId, id]);

  return (
    <StyledWrapper>
      <StyledH1>
        <StyledStrong>
          迷因產生器
        </StyledStrong>
      </StyledH1>
      <StyledContainer>
        <StyledContainer>
          {canvas ?
            <MemeEditor canvas={canvas} /> :
            <h1>讀取中...</h1>
          }
        </StyledContainer>
        <canvas id="c" />
      </StyledContainer>
    </StyledWrapper>
  );
};

export default PersonalMemeGeneratorPage;
