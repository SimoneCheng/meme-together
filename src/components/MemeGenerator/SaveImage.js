import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import { fabric } from 'fabric';

function SaveImage() {
    const { id } = useParams();
    const { path } = useRouteMatch();

    const TemplateSaveImg = () => {
        alert('hi');

    }

    const PersonalSaveImg = () => {
        alert('yo');
    }



    const renderTemplateSave = () => {
        return (
            <div>
                <button onClick={() => TemplateSaveImg()}>製作完成，儲存圖片到個人空間</button>
            </div>
        );

    }

    const renderPersonalSave = () => {
        return (
            <div>
                <button onClick={() => PersonalSaveImg()}>製作完成，輸出圖片</button>
            </div>
        );
    }

    return (
        <>
            {path === "/personal/meme-generator/:id" ? renderPersonalSave() : renderTemplateSave()}
        </>
    );
}

export default SaveImage;