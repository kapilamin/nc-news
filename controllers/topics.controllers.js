const { selectTopics, selectAllEndPoints } = require("../models/topics.models")


exports.getTopics = (req, res, next) => {
  return selectTopics()
  .then((topics) => {
    return res.status(200).send({topics})
  })
  .catch(next)
}

exports.getAllEndPoints = (req, res, next) => {
    selectAllEndPoints()
    .then((allEndPoints) => {
        res.status(200).send(allEndPoints)
    })
    .catch(next)
    }


