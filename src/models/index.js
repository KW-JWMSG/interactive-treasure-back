const config = require('../config')
const Sequelize = require('sequelize')
const { Op } = require("sequelize");
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'DB/TREASURE_HUNT.db'
// });
const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, config.mysql)
const db = {};

db.Op = Op;
db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.GAME_LIST = require('./GAME_LIST')(sequelize, Sequelize);
db.TREASURES_LIST = require('./TREASURES_LIST')(sequelize, Sequelize);
db.USER_LIST = require('./USER_LIST')(sequelize, Sequelize);


db.GAME_LIST.belongsTo(db.TREASURES_LIST, { foreignKey: 'treasure_id', sourceKey: 'treasure_id' });
db.GAME_LIST.belongsTo(db.USER_LIST, { foreignKey: 'user_id', sourceKey: 'user_id' });
db.USER_LIST.hasMany(db.GAME_LIST, { foreignKey: 'user_id', sourceKey: 'user_id' })
db.TREASURES_LIST.hasMany(db.GAME_LIST, { foreignKey: 'treasure_id', sourceKey: 'treasure_id' })



module.exports = db;