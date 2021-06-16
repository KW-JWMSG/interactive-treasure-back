/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('TREASURES_LIST', {
        treasure_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'TREASURES_LIST'
    });
};