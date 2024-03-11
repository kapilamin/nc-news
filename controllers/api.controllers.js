const { selectAPIEndpoints } = require("../models/api.models.js");

exports.getAPIEndpoints = (request, response, next) =>
{
    selectAPIEndpoints()
        .then((endpoints) =>
        {
            response.status(200).send({ endpoints });
        })
        .catch(next);
};