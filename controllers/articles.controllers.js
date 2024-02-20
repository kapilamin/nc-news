const { selectArticleById, selectAllArticles, selectCommentsByArticleId } = require("../models/articles.models")

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

exports.getCommentsByArticleId = (req,res,next) => {
    const {article_id} = req.params
    return selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({comments})
    })
    .catch(next)
}

