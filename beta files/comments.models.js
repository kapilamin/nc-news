const db = require('../db/connection.js');

exports.selectCommentsByArticleId = (id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC;`, [id])
      .then(({ rows }) => {
        return rows; 
      });
  };
  
  exports.insertCommentsByArticleId = (article_id, comment) => {
    const { username, body } = comment
    return db
      .query(
        `INSERT INTO comments (author, body, article_id)
        VALUES ($1, $2, $3) RETURNING *;`,
        [username, body, article_id]
      )
      .then(({ rows }) => {
        return rows[0]
      })
  }