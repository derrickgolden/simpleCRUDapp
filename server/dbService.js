
const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.envHOST,
    user: process.env.envUSER,
    password: process.env.envPASSWORD,
    database: process.env.envDATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if(err){
        console.log(err.message)
    }else{
        console.log('db', connection.sqlMessage)
    }
})

// const pool = mysql.createPool({
//     host: process.env.envHOST,
//     user: process.env.envUSER,
//     password: process.env.envPASSWORD,
//     database: process.env.envDATABASE,
// }).promise()

// const results = async () =>{
//     const [result] = await pool.query("SELECT * FROM notes")
//     console.log(result)
// }
// results()