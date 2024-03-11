// const { selectTopics, selectAllEndPoints } = require("../models/topics.models")


// exports.getTopics = (req, res, next) => {
//   return selectTopics()
//   .then((topics) => {
//     return res.status(200).send({topics})
//   })
//   .catch(next)
// }

// exports.getAllEndPoints = (req, res, next) => {
//     selectAllEndPoints()
//     .then((allEndPoints) => {
//         res.status(200).send(allEndPoints)
//     })
//     .catch(next)
//     }

const { selectTopics, insertTopic } = require("../models/topics.models.js");

exports.getTopics = (request, response, next) =>
{
    selectTopics()
        .then((topics) =>
        {
            response.status(200).send({ topics })
        })
        .catch(next);
};

exports.postTopic = (request, response, next) =>
{
    insertTopic(request.body)
        .then((topic) =>
        {
            response.status(201).send({ topic })
        })
        .catch(next);
};


