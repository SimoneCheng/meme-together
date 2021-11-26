import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
import { alertSuccess, alertWarning } from '../../utlis/alert';

import {
    getCompletedMemeImageUrl,
    saveCompletedMeme,
    uploadCompletedMeme
} from '../../utlis/firebase';
import color from '../Styled/colorTheme';
import { Button1 } from '../Styled/MemeGenerator/Common';
import {
    CloseButton,
    Container0,
    Container1,
    Input1,
    Input2,
    LoginButton
} from '../Styled/Popup';

function buildSearchTerm(title, tagsArr, canvas) {
    const search_array_term = [];
    for (let i = 1; i <= title.length; i++) {
        const term = title.substring(0, i);
        search_array_term.push(term);
    }
    canvas.getObjects().forEach((item) => {
        if (item.type === "i-text") {
            search_array_term.push(item.text);
        };
    })
    if (tagsArr[0] !== "") { search_array_term.concat(tagsArr) };
    return search_array_term;
}

function collectMemeInfo(title, context, imgName, userId, tags, isPublic, searchArrayTerm) {
    const memeInfo = {
        title: `${title}`,
        context: `${context}`,
        img_name: `${imgName}`,
        owner_user_id: `${userId}`,
        tags: tags,
        isPublic: isPublic,
        created_time: new Date(),
        last_save_time: new Date(),
        click_time: 0,
        search_array_term: searchArrayTerm
    }
    return memeInfo;
}

function SaveImage(props) {
    const canvas = props.canvas;
    const { path } = useRouteMatch();
    const userData = useSelector((state) => state.userData);
    const { user_id } = userData;
    const title = useRef(null);
    const context = useRef(null);
    const tags = useRef(null);
    const isPublic = useRef(null);
    const [isDisplayed, setIsDisplayed] = useState(false);

    const sendCompleteMemeInfo = () => {
        if (title.current.value === "") {
            alertWarning(undefined, '請填寫標題！');
            return;
        } else {
            const imgURL = canvas.toDataURL();
            uploadCompletedMeme(user_id, imgURL)
                .then((res) => {
                    const tagsArr = tags.current.value.split(' ');
                    const searchArrayTerm = buildSearchTerm(title.current.value, tagsArr, canvas)
                    return collectMemeInfo(
                        title.current.value,
                        context.current.value,
                        res,
                        userData.user_id,
                        tagsArr,
                        isPublic.current.checked,
                        searchArrayTerm
                    );
                })
                .then((res) => {
                    getCompletedMemeImageUrl(res.img_name)
                        .then((url) => {
                            res.img_url = url;
                            saveCompletedMeme(res.img_name, res);
                            alertSuccess('成功發布！');
                        })
                        .then(() => setIsDisplayed(false));
                });
        }
    }

    const renderTemplateSave = () => {
        return (
            <div>
                <Button1 onClick={() => setIsDisplayed(true)}>發布圖片</Button1>
            </div>
        );
    }

    const renderPersonalSave = () => {
        return (
            <div>
                <Button1 onClick={() => setIsDisplayed(true)}>完成並發布圖片</Button1>
            </div>
        );
    }

    const renderSendMemeInfoDiv = () => {
        return (
            <Container0>
                <Container1>
                    <CloseButton onClick={() => setIsDisplayed(false)}></CloseButton>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>為你的迷因加個標題（必填）</div>
                        <Input1 type="text" placeholder="輸入標題" ref={title}></Input1>
                    </div>
                    <div>
                        <div style={{ 'textAlign': 'left' }}>發發廢文（非必填）</div>
                        <Input2 cols="20" rows="6" placeholder="輸入文字" ref={context}></Input2>
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
export { collectMemeInfo };