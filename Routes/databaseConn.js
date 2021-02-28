const mysql = require("mysql");

const dbConn = mysql.createConnection({
    database: 'test',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
});

dbConn.connect((err) => {
    if (!!err) console.log(err.message);
    else console.log("Database Connection established");
})

module.exports = dbConn;
//MySql HAVE TO SEE
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     database: 'test',
//     host: 'localhost',
//     user: 'root',
//     password: '',
// })