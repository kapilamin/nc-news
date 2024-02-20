const db = require('../db/connection.js');
const fs = require('fs/promises');


exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics`)
  .then(({rows}) => {
    return rows
  })
}

exports.selectAllEndPoints = () => {
    return fs.readFile('endpoints.json', 'utf-8')
    .then((data) => {
        return JSON.parse(data);
    });
};