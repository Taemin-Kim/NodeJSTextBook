module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING(100),
            allowNULL: false,
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


