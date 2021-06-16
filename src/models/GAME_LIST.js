/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('GAME_LIST', {
        game_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        treasure_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        is_success: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        success_dtime: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        sequelize,
        tableName: 'GAME_LIST'
    });
};