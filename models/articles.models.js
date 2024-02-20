const db = require('../db/connection.js');

exports.selectArticleById = (article_id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
  .then((response) => {
      if (response.rows.length === 0) {
          return Promise.reject({status: 404, msg: 'requested article Id not found'})
      }
      return response.rows[0];
  });
}