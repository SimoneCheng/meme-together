import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
    getAllComments,
    addComment,
    deleteComment,
    updateComment,
    getUserInfo
} from '../../utlis/firebase';
import { alertError } from '../../utlis/alert';
import {
    Container0,
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6,
    Input0,
    Send,
    TrachCan,
    EditPen,
    SaveComment,
    CloseEdit
} from '../Styled/MemePage/Comments';

function Comments() {
    const { id } = useParams();
    const [allComments, setAllComments] = useState();
    const addCommentText = useRef(null);
    const editCommentText = useRef(null);
    const userData = useSelector((state) => state.userData);
    const [isEditing, setIsEditing] = useState();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        getAllComments(id, setAllComments);
        setIsEditing(false);      
    }, [])

    useEffect(() => {
        if (userData !== null && Object.keys(userData) && userData.user_name === null) {
            getUserInfo(userData.user_id, setUserInfo);
        }
    }, [userData])

    const addTheCommentClick = () => {
        if (addCommentText.current.value === "") {
            alertError(undefined, '請輸入留言！');
            return;
        } else {
            const data = {
                comment: `${addCommentText.current.value}`,
                created_time: new Date(),
                user_id: `${userData.user_id}`,
                user_name: `${userData.user_name === null ? userInfo.user_name : userData.user_name}`
            }
            addComment(id, data);
            addCommentText.current.value = "";
        }
    }

    const addTheCommentKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (addCommentText.current.value === "") {
                alertError(undefined, '請輸入留言！');
            } else {
                const data = {
                    comment: `${addCommentText.current.value}`,
                    created_time: new Date(),
                    user_id: `${userData.user_id}`,
                    user_name: `${userData.user_name === null ? userInfo.user_name : userData.user_name}`
                }
                addComment(id, data);
                addCommentText.current.value = "";
            }
        }
    }

    const deleteTheComment = (commentId) => {
        deleteComment(id, commentId);
    }

    const updateTheComment = (e, commentId) => {
        if (e.keyCode === 13) {
            const data = { comment: `${editCommentText.current.value}` };
            updateComment(id, commentId, data);
            setIsEditing(false);
        }
    }

    const clickUpdateComment = (commentId) => {
        const data = { comment: `${editCommentText.current.value}` };
        updateComment(id, commentId, data);
        setIsEditing(false);
    }

    const RenderAllComments = (item) => {
        const { comment, created_time, user_id, user_name } = item.data;
        const clickEditingBtn = () => {
            isEditing === false || isEditing !== item.docId ? setIsEditing(item.docId) : setIsEditing(false);
        }
        return (
            <Container3 key={item.docId}>
                <Container5>
                    <Link to={`/public/${user_id}`}><strong>{user_name}</strong></Link>
                    <Container6>{new Date(created_time.toDate()).toLocaleString()}</Container6>
                </Container5>
                <Container4>
                    {isEditing === item.docId ?
                        <Input0 style={{ 'margin': '10px 0' }} type="text" defaultValue={comment} ref={editCommentText} onKeyDown={(e) => updateTheComment(e, item.docId)} />
                        : comment}
                </Container4>
                <div>
                    {userData !== null && Object.keys(userData).length > 0 && user_id === userData.user_id ?
                        (isEditing === item.docId ?
                            <>
                                <SaveComment onClick={() => clickUpdateComment(item.docId)} />
                                <CloseEdit onClick={() => clickEditingBtn()} />
                            </>
                            : <>
                                <EditPen onClick={() => clickEditingBtn()} />
                                <TrachCan onClick={() => deleteTheComment(item.docId)} />
                            </>)
                        : ""}
                </div>
            </Container3>
        )
    }

    return (
        <Container0>
            <Container1>
                <div>
                    <h2>留言 ({allComments ? allComments.length : "0"})</h2>
                </div>
                {userData && Object.keys(userData).length > 0 ?
                    <Container2>
                        <Input0 placeholder="輸入文字......" type="text" onKeyDown={(e) => { addTheCommentKeyDown(e) }} ref={addCommentText} />
                        <Send onClick={() => addTheCommentClick()} />
                    </Container2> : ""}
            </Container1>
            {allComments ? allComments.map((item, index) => RenderAllComments(item, index)) : ""}
        </Container0>
    );
}

export default Comments;