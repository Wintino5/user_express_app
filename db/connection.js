const mysql = require('mysql2');
require('dotenv').config();

const is_prod = process.env.NODE_ENV === 'production';

// console.log(process.env.DB_HOST_URL)

const connection = mysql.createConnection({
    host: process.env.DB_HOST_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE_NAME
});

module.exports = connection.promise();