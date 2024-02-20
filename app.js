const express = require('express')
const { getTopics, getAllEndPoints } = require('./controllers/topics.controllers')
const { handleMissingEndpoints, handleServerErrors } = require('./controllers/error.controllers')

app = express()

app.get('/api/topics',getTopics)

app.get('/api', getAllEndPoints)

app.use(handleMissingEndpoints)
app.use(handleServerErrors)


module.exports = app