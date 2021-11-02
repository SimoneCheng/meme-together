import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { deleteComment } from '../../utlis/firebase';

function Comment(props) {
    const { id } = useParams();
    const userData = useSelector((state) => state.userData);
    const [isEditing, setIsEditing] = useState(false);
    const { comment, created_time, user_id, user_name } = props.data;

    const deleteTheComment = (commentId) => {
        deleteComment(id, commentId);
    }

    const clickEditingBtn = () => isEditing ? setIsEditing(false) : setIsEditing(true);

    return (
        <div>
            <Link to={`/public/${user_id}`}><strong>{user_name}</strong></Link>
            {isEditing ? <input type="text" defaultValue={comment} /> : comment}
            <i>{new Date(created_time.toDate()).toLocaleString()}</i>
            {user_id === userData.user_id ? <button onClick={() => clickEditingBtn()}>編輯</button> : ""}
            {user_id === userData.user_id ? <button onClick={() => deleteTheComment(props.docId)}>刪除</button> : ""}
        </div>
    )
}

export default Comment;