const db = require('../db/connection.js');
const endpoints = require('../endpoints.json');

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then(({rows}) => {
    return rows
  })
}

exports.selectAllEndPoints = () => {
  return Promise.resolve(endpoints);
};