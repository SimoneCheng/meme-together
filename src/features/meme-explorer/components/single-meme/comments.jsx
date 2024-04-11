import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAllComments,
  addComment,
  deleteComment,
  updateComment
} from "../../api";
import { Input } from "@/components/input";
import { usePersonalInfo } from "@/features/user";
import { useWatchPersonalInfo } from "@/features/user/hooks";
import {
  StyledSection,
  StyledSendIcon,
  StyledAddCommentInputWrapper,
  StyledAddCommentInputButton,
  StyledEditIcon,
  StyledTrashIcon,
  StyledCheckmarkCircleIcon,
  StyledCloseCircleIcon,
  StyledCommentInfoWrapper,
  StyledCommentCreatedTime,
  StyledComment,
  StyledCommentWrapper
} from "./comments.style";

const AddCommentInput = () => {
  const { id: memeId } = useParams();
  const [personalInfo] = usePersonalInfo();
  const [newComment, setNewComment] = useState('');

  const handleClick = () => {
    if (!newComment || !personalInfo.userId) {
      return;
    }
    const data = {
      comment: newComment,
      created_time: new Date(),
      user_id: personalInfo.userId,
      user_name: personalInfo.userName
    }
    addComment({
      memeId,
      data
    });
    setNewComment('');
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <StyledAddCommentInputWrapper>
      <Input
        variant="outline"
        placeholder="輸入文字......"
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <StyledAddCommentInputButton onClick={handleClick}>
        <StyledSendIcon />
      </StyledAddCommentInputButton>
    </StyledAddCommentInputWrapper>
  );
};

const Comment = (props) => {
  const { id: memeId } = useParams();
  const [personalInfo] = usePersonalInfo();
  const {
    data,
    docId
  } = props;
  const {
    comment,
    created_time,
    user_id,
    user_name
  } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState(comment);

  const handleEditingOpen = () => {
    setIsEditing(true);
  };

  const handleEditingClose = () => {
    setIsEditing(false);
    setEditingComment(comment);
  };

  const handleCommentUpdate = () => {
    if (!editingComment || !memeId || !docId) return;
    const data = { comment: editingComment };
    updateComment({
      memeId,
      commentId: docId,
      data
    });
    setIsEditing(false);
  };

  const handleCommentDelete = () => {
    if (!memeId || !docId) return;
    deleteComment({
      memeId,
      commentId: docId
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleCommentUpdate();
    }
  };

  return (
    <StyledCommentWrapper>
      <StyledCommentInfoWrapper>
        <Link to={`/public/${user_id}`}>
          <strong>{user_name}</strong>
        </Link>
        <StyledCommentCreatedTime>
          {new Date(created_time.toDate()).toLocaleString()}
        </StyledCommentCreatedTime>
      </StyledCommentInfoWrapper>
      {isEditing ? (
        <Input
          variant="outline"
          type="text"
          value={editingComment}
          autoFocus={true}
          onChange={(e) => setEditingComment(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <StyledComment>
          {comment}
        </StyledComment>
      )}
      {personalInfo.userId === user_id && !isEditing && (
        <div>
          <StyledEditIcon onClick={handleEditingOpen} />
          <StyledTrashIcon onClick={handleCommentDelete} />
        </div>
      )}
      {personalInfo.userId === user_id && isEditing && (
        <div>
          <StyledCloseCircleIcon onClick={handleEditingClose} />
          <StyledCheckmarkCircleIcon onClick={handleCommentUpdate} />
        </div>
      )}
    </StyledCommentWrapper>
  );
};

const Comments = () => {
  const { id: memeId } = useParams();
  const [allComments, setAllComments] = useState([]);

  useWatchPersonalInfo();

  useEffect(() => {
    if (!memeId) return;
    const unsubscribe = getAllComments({
      memeId,
      callback: setAllComments
    });
    return unsubscribe;
  }, [memeId])

  return (
    <StyledSection>
      <h2>留言({allComments.length})</h2>
      <AddCommentInput />
      {allComments.map((item) => <Comment key={item.docId} {...item} />)}
    </StyledSection>
  )
};

export default Comments;
