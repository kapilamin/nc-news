// const { selectUsers } = require("../models/users.models")

// exports.getUsers = (req,res,next) => {
//   return selectUsers()
//   .then((users) => {
//     res.status(200).send({users})
//   })
//   .catch(next)
// }

const { selectUsers, selectUserByUsername } = require("../models/users.models.js");

exports.getUsers = (request, response, next) =>
{
    selectUsers()
        .then((users) =>
        {
            response.status(200).send({ users });
        })
        .catch(next);
};

exports.getUserByUsername = (request, response, next) =>
{
    const { username } = request.params;
    selectUserByUsername(username)
        .then((user) =>
        {
            response.status(200).send({ user });
        })
        .catch(next);
};