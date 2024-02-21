const{ selectArticleById } = require("../models/articles.models");
const { insertCommentsByArticleId, selectCommentsByArticleId } = require("../models/comments.models");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
      selectArticleById(article_id),
      selectCommentsByArticleId(article_id)
  ])
  .then(([article, comments]) => {
      if (!article) {
          return res.status(404).send({ msg: 'requested article Id not found' });
      }
      res.status(200).send({ comments });
  })
  .catch(next);
}

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const comment = req.body;
  Promise.all([
    selectArticleById(article_id),
    insertCommentsByArticleId(article_id, comment)
  ])
  .then(([article, postedComment]) => {
      if (!article) {
        return res.status(404).send({ msg: 'requested Id not found' });
      }
      res.status(201).send({ postedComment });
  })
  .catch(next);
}


  