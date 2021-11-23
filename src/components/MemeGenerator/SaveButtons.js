import React from 'react';
import { useSelector } from 'react-redux';

import { Button1 } from '../Styled/MemeGenerator/Common';
import SaveStatus from './SaveStatus';
import SaveImage from './SaveImage';

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
                <Button1 onClick={() => downloadImage(canvas, 'png')}>下載圖片（png）</Button1>
            </div>
            <div>
                <Button1 onClick={() => downloadImage(canvas, 'jpg')}>下載圖片（jpg）</Button1>
            </div>
        </>
    )
}

export default SaveButtons;