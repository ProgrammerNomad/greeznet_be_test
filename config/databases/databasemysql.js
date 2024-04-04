const mysql = require("mysql2")
// const {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} = require("../../env")
const pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",  // ip address of server running mysql
    port:  "3306",
    user: "root",    // user name to your mysql database
    password: "1234",
    database: "greeznet", // use the specified database
    multipleStatements: true
})


module.exports = {
    pool    
}