const dotenv = require('dotenv')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) throw new Error("⚠Couldn't find .env file");

module.exports = {
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
    api: {
        prefix: process.env.PREFIX || '/api',
    },
    hashkey: process.env.HASHKEY || 'this_is_key',
    mysql: {
        database: process.env.MYSQL_DATABASE || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        dialect: "mysql",
        timezone: '+09:00',
    },
};


