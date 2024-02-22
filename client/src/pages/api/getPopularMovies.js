import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);
    res.status(202).json(response.data);
    // console.log('取得結果・・・', response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json('エラー発生', err);
  }
}