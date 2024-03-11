import AppLayout from '@/components/Layouts/AppLayout'
import MediaCard from '@/components/MediaCard'
import laravelAxios from '@/lib/laravelAxios'
import { Container, Grid } from '@mui/material'
import Head from 'next/head'
import useSWR from 'swr'

const Favorites = () => {
  
  const fetcher = (url) => laravelAxios.get(url).then((res) => res.data);
  const {data: favoriteItems, error} = useSWR(`api/favorites`, fetcher);

  const loading = !favoriteItems && !error;

  if(error) {
    return <div>エラーが発生しました。</div>
  }

  return (
      <AppLayout
          header={
              <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  お気に入り
              </h2>
          }>
          <Head>
              <title>Laravel - お気に入り</title>
          </Head>

          <Container>
            {loading ? (
              <>読み込み中。。。</>
            ) : favoriteItems.length > 0 ? (
              <Grid container spacing={3}>
                {favoriteItems.map((favoriteItem) => (
                  <MediaCard item={favoriteItem} key={favoriteItem.id} isContent={false} />
                ))}
              </Grid>
            ) : (
              <>お気に入り作品がありません。</>
            )}
          </Container>
      </AppLayout>
  )
}

export default Favorites
