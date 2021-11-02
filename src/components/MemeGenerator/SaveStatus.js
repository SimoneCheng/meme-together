import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom'

import { saveEditingMeme, updateEditingMeme } from '../../utlis/firebase';

function SaveStatus(props) {
    const canvas = props.canvas;
    const { path } = useRouteMatch();
    const { id } = useParams();
    const userData = useSelector((state) => state.userData);
    const { user_id } = userData;
    const [docID, setdocID] = useState('');

    const TemplateCanvasToJSON = (canvas) => {
        const status = JSON.stringify(canvas);
        const data = {
            canvas_status: status,
            backgroundImage_src: JSON.parse(status).backgroundImage.src,
            canvas_width: JSON.parse(status).backgroundImage.width,
            canvas_height: JSON.parse(status).backgroundImage.height,
            created_time: new Date(),
            last_save_time: new Date()
        }
        if (!docID) {
            saveEditingMeme(user_id, data)
                .then((docRef) => {
                    setdocID(docRef.id);
                    alert('已儲存編輯狀態！可以到個人頁面看看喔！');
                })
        } else {
            updateEditingMeme(user_id, docID, { canvas_status: status, last_save_time: new Date() })
                .then(alert('已更新編輯狀態！可以到個人頁面看看喔！'));
        }
    }

    const PersonalCanvasToJSON = (canvas) => {
        const status = JSON.stringify(canvas);
        const time = new Date();
        const data = {
            canvas_status: status,
            last_save_time: time
        }
        updateEditingMeme(user_id, id, data)
            .then(alert('已更新編輯狀態！'));
    }

    const renderTemplateSave = () => {
        return (
            <div>
                <button onClick={() => TemplateCanvasToJSON(canvas)}>製作中，儲存編輯狀態到個人空間</button>
            </div>
        );
    }

    const renderPersonalSave = () => {
        return (
            <div>
                <button onClick={() => PersonalCanvasToJSON(canvas)}>儲存編輯狀態</button>
            </div>
        );
    }

    return (
        <>
            {path === "/personal/meme-generator/:id" ? renderPersonalSave() : renderTemplateSave()}
        </>
    );
}

export default SaveStatus;