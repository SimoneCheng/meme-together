import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom'

import {
    getCompletedMemeImageUrl,
    saveCompletedMeme,
    uploadCompletedMeme
} from '../../utlis/firebase';
import color from '../Styled/colorTheme';
import { CloseButton, Container0, Container1, Input1, Input2, LoginButton } from '../Styled/Popup';

function SaveImage(props) {
    const canvas = props.canvas;
    const { id } = useParams();
    const { path } = useRouteMatch();
    const userData = useSelector((state) => state.userData);
    const { user_id } = userData;
    const title = useRef(null);
    const context = useRef(null);
    const tags = useRef(null);
    const isPublic = useRef(null);
    const [isDisplayed, setIsDisplayed] = useState();

    useEffect(() => {
        setIsDisplayed(false);
    }, [])

    const TemplateSaveImg = () => {
        setIsDisplayed(true);
    }

    const clickCloseButton = () => {
        setIsDisplayed(false);
    }

    const PersonalSaveImg = () => {
        setIsDisplayed(true);
    }

    const sendCompleteMemeInfo = () => {
        if (title.current.value === "") {
            alert('請填寫標題！');
        } else {
            const imgURL = canvas.toDataURL();
            uploadCompletedMeme(user_id, imgURL)
                .then((res) => {
                    const tagsArr = tags.current.value.split(' ');
                    const memeInfo = {
                        title: title.current.value,
                        context: context.current.value,
                        img_name: res,
                        owner_user_id: userData.user_id,
                        tags: tagsArr,
                        isPublic: isPublic.current.checked,
                        created_time: new Date(),
                        last_save_time: new Date(),
                        click_time: 0
                    }
                    return memeInfo;
                })
                .then((res) => {
                    getCompletedMemeImageUrl(res.img_name)
                        .then((url) => {
                            res.img_url = url;
                            saveCompletedMeme(res.img_name, res);
                            alert('成功輸出！')
                        })
                });
        }
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

    const renderSendMemeInfoDiv = () => {
        return (
            <Container0>
                <Container1>
                    <CloseButton onClick={() => { clickCloseButton() }}></CloseButton>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>為你的迷因加個標題（必填）</div>
                        <Input1 type="text" placeholder="輸入標題" ref={title}></Input1>
                    </div>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>發發廢文（非必填）</div>
                        <Input2 cols="33" rows="10" placeholder="輸入文字" ref={context}></Input2>
                    </div>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>加 tags？（非必填）</div>
                        <Input2 type="text" placeholder="例如：貓咪 厭世，請以半形空格分隔" ref={tags}></Input2>
                    </div>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>是否公開發佈？（之後可至個人管理頁面修改）</div>
                        <div style={{ 'marginTop': '10px' }}>
                            <input type="radio" id="true" name="privacy" value="true" ref={isPublic} defaultChecked />
                            <label htmlFor="true">是</label>
                            <input type="radio" id="false" name="privacy" value="false" />
                            <label htmlFor="false">否</label>
                        </div>
                    </div>
                    <div style={{ 'marginTop': '20px' }}>
                        <LoginButton color={color} onClick={() => { sendCompleteMemeInfo() }}>送出</LoginButton>
                    </div>
                </Container1>
            </Container0>
        )
    }

    return (
        <>
            {isDisplayed ? renderSendMemeInfoDiv() : ""}
            {path === "/personal/meme-generator/:id" ? renderPersonalSave() : renderTemplateSave()}
        </>
    );
}

export default SaveImage;