module.exports = (sequelize, DataTypes) => {
    sequelize.define('define', {
        email: {
            type: DataTypes.STIRNG(40),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STIRNG(100),
            allowNull:tue,
        },
        money: {
            type: DataTypes.INTERGER,
            allowNull: false,
            defaultValue: 0,
        },
    },{
        timestamps: true,
        paranoid: true,
    });
};


