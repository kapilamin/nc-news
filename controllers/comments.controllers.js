// const{ selectArticleById } = require("../models/articles.models");
// const { insertCommentsByArticleId, selectCommentsByArticleId } = require("../models/comments.models");

// exports.getCommentsByArticleId = (req, res, next) => {
//   const { article_id } = req.params;
//   Promise.all([
//       selectArticleById(article_id),
//       selectCommentsByArticleId(article_id)
//   ])
//   .then(([article, comments]) => {
//       if (!article) {
//           return res.status(404).send({ msg: 'requested article Id not found' });
//       }
//       res.status(200).send({ comments });
//   })
//   .catch(next);
// }

// exports.postCommentsByArticleId = (req, res, next) => {
//   const { article_id } = req.params;
//   const comment = req.body;
//   Promise.all([
//     selectArticleById(article_id),
//     insertCommentsByArticleId(article_id, comment)
//   ])
//   .then(([article, postedComment]) => {
//       if (!article) {
//         return res.status(404).send({ msg: 'requested Id not found' });
//       }
//       res.status(201).send({ postedComment });
//   })
//   .catch(next);
// }

const { selectCommentsByArticleID, insertCommentAtArticleID, updateCommentByID, removeCommentByID } = require("../models/comments.models.js");
const { selectArticleByID } = require("../models/articles.models.js");

exports.getCommentsByArticleID = (request, response, next) =>
{
    const { article_id } = request.params;
    const { limit, p } = request.query;
    selectCommentsByArticleID(article_id, limit, p)
        .then(([comments, total_count]) =>
        {
            response.status(200).send({ comments, total_count });
        })
        .catch(next);
};

exports.postCommentAtArticleID = (request, response, next) =>
{
    const { article_id } = request.params;
    insertCommentAtArticleID(request.body, article_id)
        .then((comment) =>
        {
            response.status(201).send({ comment });
        })
        .catch(next);
};

exports.patchCommentByID = (request, response, next) =>
{
    const { inc_votes } = request.body;
    const { comment_id } = request.params;
    updateCommentByID(inc_votes, comment_id)
        .then((comment) =>
        {
            response.status(200).send({ comment });
        })
        .catch(next);
};

exports.deleteCommentByID = (request, response, next) =>
{
    const { comment_id } = request.params;
    removeCommentByID(comment_id)
        .then(() =>
        {
            response.status(204).send();
        })
        .catch(next);
};
