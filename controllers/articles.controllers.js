const { selectArticleById, selectAllArticles, selectCommentsByArticleId, insertCommentsByArticleId } = require("../models/articles.models")

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



exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id) 
      .then(article => {
        if (!article) {
          return res.status(404).send({ msg: 'requested article Id not found' });
        }
        return selectCommentsByArticleId(article_id);
      })
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  };


exports.postCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params
    const {body} = req
    return insertCommentsByArticleId(article_id, body)
    .then((postedComment) => {
      res.status(201).send({postedComment})
    })
    .catch(next)
}


  