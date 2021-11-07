const mysql = require("mysql2");

const connection = mysql.createPool({
    host: 'sh-cdb-1qjbx85k.sql.tencentcdb.com',
    port: 59951,
    user: 'pothost',
    password: 'm_tNdhG4ngAZ=qnC&8zs',
    database: 'sensorpot'
});

module.exports = connection;