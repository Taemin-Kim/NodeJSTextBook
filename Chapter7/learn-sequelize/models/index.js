// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


// 연결안될떄 강제로 에러냄
// var Task = sequelize.define("Task", {
//     title: Sequelize.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         Task.belongsTo(models.User, {
//           onDelete: "CASCADE",
//           foreignKey: {
//             allowNull: false
//           }
//         });
//       }
//     }
//   });
  
//   var User = sequelize.define("User", {
//     username: Sequelize.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         User.hasMany(models.Task);
//       }
//     }
//   });
  
//   db.User = User;
//   db.Task = Task;
  
//   Object.keys(db).forEach(function(modelName) {
//     if ("associate" in db[modelName]) {
//       db[modelName].associate(db);
//     }
//   });
  
//   sequelize.sync().then(() => {
//     // some code here
//   });


// const path = require('path');
// const Sequelize = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// const db = {};
// // var db = require('../db'),

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;


// db.User = require('./user')(sequelize,Sequelize);
// db.Comment = require('./comment')(sequelize,Sequelize);

// db.User.hasMany(db.Comment, { foreignkey : 'commenter', sourceKey: 'id'});
// db.Comment.belongsTo(db.User, { foreignkey : 'commenter', targetKey : 'id'});



// module.exports = db;











//============================================

const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;