const express = require('express')
const { getTopics } = require('./controllers/topics.controllers')
const { handleMissingEndpoints, handleServerErrors } = require('./controllers/error.controllers')
const fs = require('fs/promises')

app = express()

app.get('/api/topics',getTopics)

app.get('/api',(req,res,next) => {
    return fs.readFile(`${__dirname}/endpoints.json`)
    .then((rawEndpoints) => {
      const endpoints = JSON.parse(rawEndpoints)
      res.status(200).send({endpoints})
    })
  })

app.use(handleMissingEndpoints)
app.use(handleServerErrors)


module.exports = app