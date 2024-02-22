const { selectArticleById, selectAllArticles, updateArticleById } = require("../models/articles.models")
const { removeCommentById } = require("../models/comments.models")

exports.getAllArticles = (req,res,next) => {
    return selectAllArticles()
    .then((articles) => {
      res.status(200).send({articles})
    })
    .catch(next)
  }
  

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}


exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  if (inc_votes === undefined || typeof inc_votes !== 'number') {
    return res.status(400).send({ msg: 'invalid vote increment supplied' });
  }
  updateArticleById(article_id, { inc_votes })
    .then(updatedArticle => {
      if (!updatedArticle) {
        return res.status(404).send({ msg: 'requested article Id not found' });
      }
      res.status(200).send({ updatedArticle });
    })
    .catch(next); 
};

exports.deleteCommentById = (req,res,next) => {
  const {comment_id} = req.params
  return removeCommentById(comment_id)
  .then(() => {
    res.status(204).send()
  })
  .catch(next)
}
