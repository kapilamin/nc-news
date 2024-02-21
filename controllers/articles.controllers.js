const { selectArticleById, selectAllArticles, updateArticleById } = require("../models/articles.models")

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

exports.patchArticleById = (req,res,next) => {
  const {article_id} = req.params
  const promises = [updateArticleById(article_id,req.body), selectArticleById(article_id)]

  return Promise.all(promises).then((fulfilledPromises) => {
    updatedArticle = fulfilledPromises[0]
    res.status(200).send({updatedArticle})
  })
  .catch(next)
}





  