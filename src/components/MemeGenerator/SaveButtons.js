import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SaveStatus from './SaveStatus';
import SaveImage from './SaveImage';

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

function SaveButtons() {
    const userData = useSelector((state) => state.userData);
    const canvas = useSelector((state) => state.canvas);

    const downloadImage = (canvi, imageFormat) => {
        const link = document.createElement("a");
        link.href = canvi.toDataURL();
        link.download = `meme-generator-${new Date().getTime()}.${imageFormat}`;
        link.click();
    }

    return (
        <>
            {userData ? <SaveStatus canvas={canvas} /> : ""}
            {userData ? <SaveImage canvas={canvas} /> : ""}
            <div>
                <Button0 onClick={() => downloadImage(canvas, 'png')}>下載圖片（png）</Button0>
            </div>
            <div>
                <Button0 onClick={() => downloadImage(canvas, 'jpg')}>下載圖片（jpg）</Button0>
            </div>
        </>
    )
}

export default SaveButtons;