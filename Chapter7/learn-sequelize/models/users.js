const { sequelize } = require(".");
const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        name: {
            type: DataTypes.STRING(20),
            allowNULL: false,
            unique: true,
        },
        age : {
            type: DataTypes.INTERGER.UNSIGNED,
            allowNULL: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNULL: false,
        },
        comment: {
            type: DataTypes.TEXT ,
            allowNULL: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNULL: false,
            defaultValue: DataTypes.GetNow(),
        },
    }, {
        timestamp: false,
    });

};


