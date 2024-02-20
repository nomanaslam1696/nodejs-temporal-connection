const mysql = require('mysql');
require('dotenv').config()
export const connection = mysql.createConnection(process.env.DATABASE_URL);