const selectArticleById  = require("../models/articles.models");
const { insertCommentsByArticleId, selectCommentsByArticleId } = require("../models/comments.models");

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

  exports.postCommentsByArticleId = (req,res,next) => {
    const {article_id} = req.params
    const {body} = req
    const promises = [insertCommentsByArticleId(article_id,body),selectArticleById(article_id)]
    return Promise.all(promises)
    .then((fulfilledPromises) => {
      postedComment = fulfilledPromises[0]
      res.status(201).send({postedComment})
    })
    .catch(next)
  }


  