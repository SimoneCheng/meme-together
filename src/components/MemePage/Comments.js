import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
    getAllComments,
    addComment,
    deleteComment,
    updateComment
} from '../../utlis/firebase';

const Container0 = styled.div`
  width: 400px;
  margin: 20px auto;
`;

const Container1 = styled.div`
  font-size: 16px;
  margin: 20px auto;
  width: 400px;
`;

function Comments() {
    const { id } = useParams();
    const [allComments, setAllComments] = useState();
    const addCommentText = useRef(null);
    const editCommentText = useRef(null);
    const userData = useSelector((state) => state.userData);
    const [isEditing, setIsEditing] = useState();

    useEffect(() => {
        getAllComments(id, setAllComments);
        setIsEditing(false);
    }, [])

    const addTheCommentClick = () => {
        if (userData === null || Object.keys(userData).length === 0) {
            alert('請先登入！');
            return;
        } else if (addCommentText.current.value === "") {
            alert('請輸入留言！');
            return;
        } else {
            const data = {
                comment: `${addCommentText.current.value}`,
                created_time: new Date(),
                user_id: `${userData.user_id}`,
                user_name: `${userData.user_name}`
            }
            addComment(id, data);
            addCommentText.current.value = "";
        }
    }

    const addTheCommentKeyDown = (e) => {
        if (userData === null || Object.keys(userData).length === 0) {
            alert('請先登入！');
            return;
        } else if (e.keyCode === 13) {
            if (addCommentText.current.value === "") {
                alert('請輸入留言！');
                return;
            } else {
                const data = {
                    comment: `${addCommentText.current.value}`,
                    created_time: new Date(),
                    user_id: `${userData.user_id}`,
                    user_name: `${userData.user_name}`
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
            const data = { comment: editCommentText.current.value };
            updateComment(id, commentId, data);
            setIsEditing(false);
        }
    }

    const RenderAllComments = (item, index) => {
        const { comment, created_time, user_id, user_name } = item.data;
        const clickEditingBtn = () => {
            isEditing === false || isEditing !== item.docId ? setIsEditing(item.docId) : setIsEditing(false);
        }
        return (
            <div>
                <Link to={`/public/${user_id}`}><strong>{user_name}</strong></Link>
                {isEditing === item.docId ? <input type="text" defaultValue={comment} ref={editCommentText} onKeyDown={(e) => updateTheComment(e, item.docId)} /> : comment}
                <i>{new Date(created_time.toDate()).toLocaleString()}</i>
                {userData !== null && Object.keys(userData).length > 0 && user_id === userData.user_id ? <button onClick={() => clickEditingBtn()}>編輯</button> : ""}
                {userData !== null && Object.keys(userData).length > 0 && user_id === userData.user_id ? <button onClick={() => deleteTheComment(item.docId)}>刪除</button> : ""}
            </div>
        )
    }

    return (
        <Container0>
            <Container1>
                <div>
                    <h2>留言({allComments ? allComments.length : "0"})</h2>
                </div>
                <div>
                    {userData && Object.keys(userData).length > 0 ? <input type="text" onKeyDown={(e) => { addTheCommentKeyDown(e) }} ref={addCommentText} /> : ""}
                    {userData && Object.keys(userData).length > 0 ? <button onClick={() => addTheCommentClick()}>輸入留言</button> : ""}
                </div>
            </Container1>
            {allComments ? allComments.map((item, index) => RenderAllComments(item, index)) : ""}
        </Container0>

    );
}

export default Comments;