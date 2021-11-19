import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdSend, MdEdit } from 'react-icons/md';
import {
    IoIosCheckmarkCircle,
    IoIosCloseCircle,
    IoIosTrash
} from 'react-icons/io';
import styled from 'styled-components';

import {
    getAllComments,
    addComment,
    deleteComment,
    updateComment,
    getUserInfo
} from '../../utlis/firebase';
import { alertError } from '../../utlis/alert';

const Container0 = styled.div`
  background-color: #fff;
  padding: 10px 30px 1px 30px;
`;

const Container1 = styled.div`
  font-size: 1rem;
  width: 100%;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Container4 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  word-break: break-word;
`;

const Container5 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container6 = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;

const Input0 = styled.input`
  width: -webkit-fill-available;
  padding: 10px;
  border-radius: 50px;
  border: 2px solid #ccc;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Send = styled(MdSend)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  position: relative;
  bottom: 38px;
  right: 10px;
  &:hover{
      color: #056;
  }
`;

const TrachCan = styled(IoIosTrash)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: #056;
  }
`;

const EditPen = styled(MdEdit)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: #056;
  }
`;

const SaveComment = styled(IoIosCheckmarkCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: #00EC00;
  }
`;

const CloseEdit = styled(IoIosCloseCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: red;
  }
`;

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