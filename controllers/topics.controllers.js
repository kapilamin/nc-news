const { selectTopics, selectAllEndPoints } = require("../models/topics.models")
const endpoints = require('../endpoints.json');


exports.getTopics = (req, res, next) => {
  return selectTopics()
  .then((topics) => {
    return res.status(200).send({topics})
  })
  .catch(next)
}

// exports.getAllEndpoints = (req, res, next) => {
//     return fs.readFile(`${__dirname}/endpoints.json`)
//     .then((rawEndpoints) => {
//         //const endpoints = JSON.parse(rawEndpoints)
//         res.status(200).send({endpoints})
//     })
// }
exports.getAllEndPoints = (request, response, next) => {
    selectAllEndPoints()
    .then((allEndPoints) => {
        response.status(200).send(allEndPoints)
    })
    .catch((err) => {
        next(err);
    });
};


