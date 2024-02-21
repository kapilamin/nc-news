const express = require('express')
const { getTopics, getAllEndPoints } = require('./controllers/topics.controllers')
const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./controllers/error.controllers')
const { getArticleById, getAllArticles, getCommentsByArticleId, postCommentsByArticleId } = require('./controllers/articles.controllers')

app = express()

app.get('/api/topics',getTopics)
app.get('/api', getAllEndPoints)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.use(express.json())

app.post('/api/articles/:article_id/comments', postCommentsByArticleId)

app.all('/*', (req, res) => {
    res.status(404).send({msg: "Endpoint does not exist"});
});

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app