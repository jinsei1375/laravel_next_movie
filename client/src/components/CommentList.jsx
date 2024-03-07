import { Grid } from '@mui/material'
import React from 'react'
import Comment from './Comment'

const CommentList = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      <Grid
        item
        xs={12}
      >
        <Comment />
      </Grid>
    </Grid>
  )
}

export default CommentList