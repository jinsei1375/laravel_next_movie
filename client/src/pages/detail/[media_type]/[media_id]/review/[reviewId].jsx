import CommentList from '@/components/CommentList'
import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import { Card, CardContent, Container, Rating, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const ReviewDetail = () => {
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { reviewId } = router.query;

  useEffect(() => {
    if (!reviewId) {
      return;
    }
    const fetchReviewDetail = async() => {
      try {
        const response = await laravelAxios.get(`api/review/${reviewId}`);
        console.log(response.data);
        setReview(response.data);
        setComments(response.data.comments);
      } catch(err) {
        console.log(err);
      }
    }
    fetchReviewDetail();
  },[reviewId])

  return (
    <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ReviewDetail
                </h2>
            }>
            <Head>
                <title>Laravel - ReviewDetail</title>
            </Head>

            <Container sx={{ py: 2 }}>
              { review && (
                <>
                  {/* レビュー内容 */}
                  <Card sx={{ minHeight: '200px' }}>
                    <CardContent>
                      <Typography
                          variant='h6'
                          component={"div"}
                          gutterBottom
                        >
                          {review.user.name}
                      </Typography>
                      <Rating 
                        name="read-only"
                        value={review.rating}
                        readOnly
                      />
                      <Typography
                        variant='body2'
                        color="textSecondary"
                        component="p"
                      >
                        {review.content}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* コメント */}
                  <CommentList />
                </>
              ) }
            </Container>

    </AppLayout>
  )
}

export default ReviewDetail