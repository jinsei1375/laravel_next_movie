import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CardActionArea, CardMedia, Typography } from '@mui/material';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async() => {
            try {
                const response = await axios.get('api/getPopularMovies');
                console.log(response.data.results);
                setMovies(response.data.results);
                console.log(movies);
            } catch (err) {
                console.log(err);
            }
        }
        fetchMovies();
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Home</title>
            </Head>

            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                    481: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    761: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }
                }
                >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <CardMedia
                            component={"img"}
                            sx={{ 
                                aspectRatio: '2/3',
                            }}
                            image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <Typography>
                            公開日：{movie.release_date}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>


        </AppLayout>
    )
}

export default Home
