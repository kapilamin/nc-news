// const express = require('express')
// const { getTopics, getAllEndPoints } = require('./controllers/topics.controllers')
// const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./controllers/error.controllers')
// const { getArticleById, getAllArticles, patchArticleById, deleteCommentById } = require('./controllers/articles.controllers')
// const { getCommentsByArticleId, postCommentsByArticleId } = require('./controllers/comments.controllers')
// const { getUsers } = require('./controllers/users.controllers')

// app = express()
// app.use(express.json())

// app.get('/api/topics',getTopics)
// app.get('/api', getAllEndPoints)
// app.get('/api/articles', getAllArticles)
// app.get('/api/articles/:article_id', getArticleById)
// app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
// app.get('/api/users', getUsers)


// app.delete('/api/comments/:comment_id',deleteCommentById)

// app.post('/api/articles/:article_id/comments', postCommentsByArticleId)
// app.post('/api/articles')
// app.patch('/api/articles/:article_id', patchArticleById)

// app.all('/*', (req, res) => {
//     res.status(404).send({msg: "Endpoint does not exist"});
// });

// app.use(handleCustomErrors)
// app.use(handlePsqlErrors)
// app.use(handleServerErrors)


// module.exports = app

const express = require('express');
const { handleEndpointErrors, handlePSQLErrors, handleCustomErrors, handleServerErrors } = require('./errors');
const apiRouter = require('./routes/apiRouter.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handleEndpointErrors);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;