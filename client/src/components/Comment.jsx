import { Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const Comment = ({comment}) => {
  return (
    <Card>
      <CardContent>
        <Typography
            variant='h6'
            component={"div"}
            gutterBottom
          >
            {comment.user_name}
        </Typography>
        <Typography
          variant='body2'
          color="textSecondary"
          component="p"
        >
          {comment.content}
        </Typography>
        <Grid container justifyContent="flex-end">
          <ButtonGroup>
            <Button>編集</Button>
            <Button color='error'>削除</Button>
          </ButtonGroup>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Comment