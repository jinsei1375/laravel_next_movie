import AppLayout from '@/components/Layouts/AppLayout';
import Layout from '@/components/Layouts/Layout';
import MediaCard from '@/components/MediaCard';
import SideBar from '@/components/SideBar';
import { Grid } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function search() {
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const {query: searchQuery} = router.query;
  const [loading, setLoading] = useState(true);

  console.log(category);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchMedia = async() => {
      try {
        const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`);
        const searchResults = response.data.results;
        const validResults = searchResults.filter((item) => item.media_type == 'movie' || item.media_type == 'tv');
        setResults(validResults);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, [searchQuery])

  const fileteredResults = results.filter((result) => {
    if (category == 'all') {
      return true;
    }

    return result.media_type === category;
  })

  console.log(fileteredResults);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Search
        </h2>
      }
    >
      <Head>
          <title>Laravel - Search</title>
      </Head>
      <Layout sidebar={<SideBar setCategory={setCategory} />}>
        {loading ? (
          <div>
            検索中
          </div>
        ) : fileteredResults.length > 0 ? (
        <Grid container spacing={3}>
          {fileteredResults.map((media) => (
            <MediaCard item={media} key={media.id} isContent={true} />
          ))}
        </Grid>
        ) : (
          <div>
            検索結果が見つかりませんでした。
          </div>
        )}
      </Layout>
    </AppLayout>
  )
}

export default search