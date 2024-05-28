import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fabric } from '@/libs/fabric';
import {
  getTheTemplate,
  MemeEditor,
  DownloadWithPngButton,
  DownloadWithJpgButton,
  TemplateSaveCanvasStatusButton,
  TemplatePublishButton
} from '@/features/meme-generator';
import {
  StyledWrapper,
  StyledH1,
  StyledStrong,
  StyledCanvasContainer,
  StyledMemeEditorContainer,
  StyledButtonsContainer
} from './style';

const TemplateMemeGeneratorPage = () => {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!id) return;
    getTheTemplate(id).then((res) => {
      // init canvas
      if (!res) return;
      const image_url = res.image_url;
      const newImg = new Image();
      newImg.crossOrigin = 'Anonymous';
      newImg.src = image_url;
      newImg.onload = function () {
        const canvas = new fabric.Canvas('meme-canvas', {
          width: 600,
          height: this.height * (600 / this.width),
          hoverCursor: 'grab',
          freeDrawingCursor: 'crosshair',
          isDrawingMode: false,
          backgroundImage: new fabric.Image(newImg, {
            scaleX: 600 / this.width,
            scaleY: 600 / this.width
          }),
        });
        const text = new fabric.IText('請輸入文字', {
          top: 50,
          left: 50,
          fill: '#ffffff',
          stroke: '#000000',
          strokeWidth: 2,
          fontWeight: 800,
          fontSize: 60,
          fontFamily: 'Arial'
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
        setCanvas(canvas);
      };
    });
  }, [id]);

  return (
    <StyledWrapper>
      <StyledH1>
        <StyledStrong>
          迷因產生器
        </StyledStrong>
      </StyledH1>
      <div>
        <StyledCanvasContainer>
          <StyledMemeEditorContainer>
            {canvas ?
              <MemeEditor canvas={canvas} /> :
              <h1>讀取中...</h1>
            }
          </StyledMemeEditorContainer>
          <canvas id="meme-canvas" />
        </StyledCanvasContainer>
        <StyledButtonsContainer>
          {canvas && <TemplateSaveCanvasStatusButton canvas={canvas} />}
          {canvas && <TemplatePublishButton canvas={canvas} />}
          {canvas && <DownloadWithPngButton canvas={canvas} />}
          {canvas && <DownloadWithJpgButton canvas={canvas} />}
        </StyledButtonsContainer>
      </div>
    </StyledWrapper>
  );
};

export default TemplateMemeGeneratorPage;
