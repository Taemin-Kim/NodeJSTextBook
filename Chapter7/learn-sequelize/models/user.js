// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define('user', {
//         name: {
//             type: DataTypes.STRING(20),
//             allowNULL: false,
//             unique: true,
//         },
//         age : {
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNULL: false,
//         },
//         married: {
//             type: DataTypes.BOOLEAN,
//             allowNULL: false,
//         },
//         comment: {
//             type: DataTypes.TEXT ,
//             allowNULL: true,
//         },
//         created_at: {
//             type: DataTypes.DATE,
//             allowNULL: false,
//             defaultValue: DataTypes.NOW
//         },
//     }, {
//         timestamps: false,
//     });

// };


const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
