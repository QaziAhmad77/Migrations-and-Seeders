'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// npm install --save-dev sequelize-cli sequelize mysql2
// npx sequelize-cli init
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:status
// db:migrate:undo:all
// npx sequelize-cli db:migrate:undo --name 20220909192815-create-user.js
// npx sequelize-cli seed:generate --name demo-user
// npx sequelize-cli db:seed:all 
// npx sequelize-cli db:seed --seed 20220909194240-create-employee.js
// npx sequelize-cli db:seed:undo
// npx sequelize-cli db:seed:undo --seed 20220909194240-create-employee.js
