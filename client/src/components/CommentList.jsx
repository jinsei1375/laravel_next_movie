import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Comment from './Comment'
import laravelAxios from '@/lib/laravelAxios'

const CommentList = ({comments, setComments}) => {
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleDelete = async(commentId) => {
    try {
      const response = await laravelAxios.delete(`api/comments/${commentId}`);
      console.log(response.data);

      const filteredComments = comments.filter((comment) => comment.id !== commentId);
      setComments(filteredComments);
    } catch(err) {
      console.log(err);
    }
  }

  const handleEdit = async(comment) => {
    try {
      setEditMode(comment.id);
      setEditedContent(comment.content);

    } catch(err) {
      console.log(err);
    }
  }

  const hadleConfirmEdit = async(commentId) => {
    try {
      const response = await laravelAxios.put(`api/comments/${commentId}`, {
        content: editedContent
      });
      console.log(response.data);
      const updatedComment = response.data;
      setEditMode(null);
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment, 
            content: updatedComment.content,
          }
        }
        return comment;
      });
      setComments(updatedComments);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {comments.map((comment) => (
        <Grid
          item
          xs={12}
          key={comment.id}
        >
          <Comment 
          comment={comment} 
          onDelete={handleDelete} 
          handleEdit={handleEdit} 
          editMode={editMode}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          hadleConfirmEdit={hadleConfirmEdit}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default CommentList