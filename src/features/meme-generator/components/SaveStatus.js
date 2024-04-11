import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useAuthId } from '@/features/auth';
import { saveEditingMeme, updateEditingMeme } from '../../../utlis/firebase';
import { alertSuccess } from '../../../utlis/alert';
import { Button1 } from './Styled/Common';

function SaveStatus(props) {
    const canvas = props.canvas;
    const { path } = useRouteMatch();
    const { id } = useParams();
    const [authId] = useAuthId();
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
            saveEditingMeme(authId, data)
                .then((docRef) => {
                    setdocID(docRef.id);
                    alertSuccess('已儲存編輯狀態！可以到個人頁面看看喔！');
                })
        } else {
            updateEditingMeme(authId, docID, { canvas_status: status, last_save_time: new Date() })
                .then(alertSuccess('已更新編輯狀態！可以到個人頁面看看喔！'));
        }
    }

    const PersonalCanvasToJSON = (canvas) => {
        const status = JSON.stringify(canvas);
        const time = new Date();
        const data = {
            canvas_status: status,
            last_save_time: time
        }
        updateEditingMeme(authId, id, data)
            .then(alertSuccess('已更新編輯狀態！'));
    }

    const renderTemplateSave = () => {
        return (
            <div>
                <Button1 onClick={() => TemplateCanvasToJSON(canvas)}>儲存編輯狀態到個人空間</Button1>
            </div>
        );
    }

    const renderPersonalSave = () => {
        return (
            <div>
                <Button1 onClick={() => PersonalCanvasToJSON(canvas)}>儲存編輯狀態</Button1>
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