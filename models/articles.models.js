const db = require('../db/connection.js');

exports.selectAllArticles = () => {
  return db.query(`SELECT articles.article_id,articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comment_id) AS INT) comment_count FROM articles
  LEFT OUTER JOIN comments ON articles.article_id = comments.article_id
  GROUP By articles.article_id
  ORDER BY articles.created_at DESC;`)
  .then(({ rows }) => {
    return rows
  })
}

exports.selectArticleById = (id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1', [id])
  .then((res) => {
      if (!res.rows.length) {
          return Promise.reject({
          status: 404, msg: 'requested article Id not found'
        })
      }
      return res.rows[0];
  });
}

// exports.updateArticleById = (article_id, body) => {
//   const {inc_votes} = body
//   if (!inc_votes || (typeof inc_votes !== 'number')) {
//     return Promise.reject({status:400,customErrMsg:'invalid vote increment supplied'})
//   }
//   return db.query(`UPDATE articles
//   SET votes = votes + $1
//   WHERE article_id = $2 RETURNING *;`,[inc_votes,article_id])
//   .then(({rows}) => {
//     return rows[0]
//   })
// }

exports.updateArticleById = (article_id, body) => {
  const { inc_votes } = body;
  if (inc_votes === undefined || typeof inc_votes !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'invalid vote increment supplied',
    });
  }
  return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2 RETURNING *;
  `, [inc_votes, article_id])
  .then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: 'requested article Id not found',
      });
    }
    return rows[0];
  });
};



