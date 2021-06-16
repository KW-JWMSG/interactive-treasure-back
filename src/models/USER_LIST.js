/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('USER_LIST', {
        user_id: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        user_pw: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        permission: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'USER_LIST'
    });
};