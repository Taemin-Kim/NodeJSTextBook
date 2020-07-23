// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define('comment', {
//         comment: {
//             type: DataTypes.STRING(100),
//             allowNull: false
//         },
//         created_at : {
//             type: DataTypes.DATE,
//             allowNull: true,
//             defaultValue: DataTypes.NOW
//         },
//     }, {
//         tableName: 'comments',
//         timestamps: false,
//     });
// };


  
const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({

      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};