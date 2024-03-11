// const { selectArticleById, selectAllArticles, updateArticleById } = require("../models/articles.models")
// const { removeCommentById } = require("../models/comments.models")

// exports.getAllArticles = (req,res,next) => {
//     return selectAllArticles()
//     .then((articles) => {
//       res.status(200).send({articles})
//     })
//     .catch(next)
//   }
  

// exports.getArticleById = (req, res, next) => {
//     const {article_id} = req.params;
//     selectArticleById(article_id).then((article) => {
//         res.status(200).send({article})
//     })
//     .catch(next)
// }


// exports.patchArticleById = (req, res, next) => {
//   const { article_id } = req.params;
//   const { inc_votes } = req.body;
//   if (inc_votes === undefined || typeof inc_votes !== 'number') {
//     return res.status(400).send({ msg: 'invalid vote increment supplied' });
//   }
//   updateArticleById(article_id, { inc_votes })
//     .then(updatedArticle => {
//       if (!updatedArticle) {
//         return res.status(404).send({ msg: 'requested article Id not found' });
//       }
//       res.status(200).send({ updatedArticle });
//     })
//     .catch(next); 
// };

// exports.deleteCommentById = (req,res,next) => {
//   const {comment_id} = req.params
//   return removeCommentById(comment_id)
//   .then(() => {
//     res.status(204).send()
//   })
//   .catch(next)
// }

const { selectArticles, insertArticle, selectArticleByID, updateArticleByID, removeArticleByID } = require("../models/articles.models.js");

exports.getArticles = (request, response, next) =>
{
    const { topic, sort_by, order, limit, p } = request.query;
    selectArticles(topic, sort_by, order, limit, p)
        .then(([articles, total_count]) =>
        {
            response.status(200).send({ articles, total_count });
        })
        .catch(next);
};

exports.postArticle = (request, response, next) =>
{
    insertArticle(request.body)
        .then((article) =>
        {
            response.status(201).send({ article });
        })
        .catch(next);
};

exports.getArticleByID = (request, response, next) =>
{
    const { article_id } = request.params;
    selectArticleByID(article_id)
        .then((article) =>
        {
            response.status(200).send({ article });
        })
        .catch(next);
};

exports.patchArticleByID = (request, response, next) =>
{
    const { inc_votes } = request.body;
    const { article_id } = request.params;
    updateArticleByID(inc_votes, article_id)
        .then((article) =>
        {
            response.status(200).send({ article });
        })
        .catch(next);
};

exports.deleteArticleByID = (request, response, next) =>
{
    const { article_id } = request.params;
    removeArticleByID(article_id)
        .then(() =>
        {
            response.status(204).send();
        })
        .catch(next);
};