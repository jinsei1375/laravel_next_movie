import AppLayout from '@/components/Layouts/AppLayout';
import { Box, Button, Card, CardContent, Container, Fab, Grid, Modal, Rating, TextareaAutosize, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import laravelAxios from '@/lib/laravelAxios';

const Detail = ({detail, media_type, media_id}) => {

  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [averageRating, setAverageRating] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  }

  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
  }

  const isDisabled = !rating || !review.trim();

  const handleReviewAdd = async() => {
    handleClose();
    try {
      const response = await laravelAxios.post(`api/reviews`, {
        content: review,
        rating: rating,
        media_type: media_type,
        media_id: media_id
      });
      const newReview = response.data;
      setReview("");
      setRating(0);
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);

      updateAverageRating(updatedReviews);
    } catch(err) {
      console.log(err);
    }
  }

const updateAverageRating = (updatedReviews) => {
  if (updatedReviews.length > 0) {
    const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating((totalRating / updatedReviews.length).toFixed(1));
  }
}

useEffect(() => {
  const fetchReviews = async() => {
    try {
      const response = await laravelAxios.get(`api/reviews/${media_type}/${media_id}`);
      const fetchReviews = response.data;
      console.log(fetchReviews);
      setReviews(fetchReviews);
      updateAverageRating(fetchReviews);
    } catch(err) {
      console.log(err);
    } 
  }
  fetchReviews();
}, [media_type, media_id])

  return (
    <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  {detail.title} - Detail
                </h2>
            }>
            <Head>
                <title>Laravel - Detail</title>
            </Head>
            <Box
              sx={{ 
                height: {xs: "auto", md: "70vh"},
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Box 
                sx={{ 
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,

                  '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    bsackgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)'
                  }
                }}
              />
              <Container sx={{ zIndex: 1 }}>
                <Grid container alignItems={"center"} color={"white"}>
                  <Grid md={4} sx={{display: "flex", justifyContent: "center"}} item>
                    <img width={"70%"} src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} alt="" />
                  </Grid>
                  <Grid md={8} item>
                    <Typography variant='h4' paragraph>{detail.title || detail.name}</Typography>
                    <Typography>{detail.overview}</Typography>
                    <Box
                      sx={{ 
                        display: "flex",
                        alignItems: "center",
                        mb: 2
                      }}
                    >
                      <Rating
                        readOnly
                        precision={0.5}
                        value={parseFloat(averageRating)}
                        emptyIcon={<StarIcon style={{ color: "white"}}/>}
                      />
                      <Typography
                        sx={{ 
                          ml: 1,
                          fontSize: "1.5rem",
                          fontWeight: "bold"
                        }}
                      >
                        {averageRating}
                      </Typography>
                    </Box>
                    <Typography variant='h6'>
                      {media_type == 'movie' ? `公開日：${detail.release_date}` : `初回放送日：${detail.first_air_date}`}
                      </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* レビュー内容表示 */}
            <Container xs={{ py: 4 }} style={{ marginTop: "10px" }}>
              <Typography
                component={"h1"}
                variant='h4'
                align='center'
                gutterBottom
              >
                レビュー一覧
              </Typography>
              <Grid container spacing={3}>
                {reviews.map((review) => (
                  <Grid item key={review.id} xs={12}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant='h6'
                          component={"div"}
                          gutterBottom
                        >
                          {review.user.name}
                        </Typography>

                        <Rating 
                          value={review.rating}
                          readOnly
                        />

                        <Typography
                          variant='body2'
                          color="textSecondary"
                          paragraph
                        >
                          {review.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            {/* レビュー内容表示 */}

            {/* レビュー追加ボタン */}
            <Box
              sx={{ 
                position: "fixed" ,
                bottom: "16px",
                right: "16px",
                zIndex: 100
              }}
            >
              <Tooltip title="レビュー追加">
                <Fab
                  style={{ 
                    background: "#1976d2", 
                    color: "white"
                  }}
                  onClick={handleOpen}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Box>
            {/* レビュー追加ボタン */}

            {/* モーダル */}
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{ 
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid, #000",
                  boxShadow: 24,
                  p: 4
                }}
              >
                <Typography variant='h6' component={"h2"}>
                  レビューを書く
                </Typography>
                <Rating
                  required
                  onChange={handleRatingChange}
                  value={rating}
                />
                  <TextareaAutosize
                    required
                    minRows={5}
                    placeholder='レビュー内容'
                    style={{ width: "100%", marginTop: "10px" }}
                    onChange={handleReviewChange}
                    value={review}
                  />

                  <Button
                    variant='outlined'
                    disabled={isDisabled}
                    onClick={handleReviewAdd}
                  >
                    レビュー投稿
                  </Button>
              </Box>
            </Modal>
            {/* モーダル */}
    </AppLayout>
  )
}

export async function getServerSideProps(context) {
  const {media_type, media_id} = context.params;

  try {
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);

    let combinedData = {...jpResponse.data};
    if (!jpResponse.data.overview) {
      const enResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
      combinedData.overview = enResponse.data.overview;
    }

    return {
      props: {detail: combinedData, media_type, media_id}
    }
  } catch {
    return {notFound: true}
  }
}
export default Detail
