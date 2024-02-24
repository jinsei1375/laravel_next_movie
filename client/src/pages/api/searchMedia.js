import axios from "axios";

// export default async function handler(req, res) {
//     const {searchQuery} = req.query;
//     console.log(searchQuery);
//     if (!searchQuery) {
//       return res.status(400).json({message: '検索結果がありません'});
//     }
//     try {
//       const response = await axios(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${searchQuery}`);
//       res.status(202).json(response.data);
//     } catch(err) {
//       console.log('エラー内容・・・', err);
//       return res.status(500).json({message: 'エラー発生'});
//     }
// }

// .then()でやってみた
export default (req, res) => {
    const {searchQuery} = req.query;
    if (!searchQuery) {
      return res.status(400).json({message: '検索結果がありません'});
    }

    axios(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        return res.status(202).json(response.data);
      })
      .catch(err => {
        console.log('エラー内容・・・', err);
        return res.status(500).json({message: 'エラー発生'});
      });
}