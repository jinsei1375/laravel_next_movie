import AppLayout from '@/components/Layouts/AppLayout';
import SearchBar from '@/components/SearchBar';
import { Box, Card, CardContent, Container, Grid, Rating, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react'

const Detail = ({detail, media_type}) => {
  // console.log(detail);

  // const [reviews, setReviews] = useState([]);

  const reviews = [
    {
      id: 1,
      content: "面白かった",
      rating: 4,
      user: {
        name: "山田"
      }
    },
    {
      id: 2,
      content: "面白かった",
      rating: 4,
      user: {
        name: "山田"
      }
    },
    {
      id: 3,
      content: "面白かった",
      rating: 4,
      user: {
        name: "山田"
      }
    },
    {
      id: 4,
      content: "面白かった",
      rating: 4,
      user: {
        name: "山田"
      }
    },
  ]

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
                    <Typography variant='h6'>
                      {media_type == 'movie' ? `公開日：${detail.release_date}` : `初回放送日：${detail.first_air_date}`}
                      </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* レビュー内容表示 */}
            <Container xs={{ py: 4 }}>
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
