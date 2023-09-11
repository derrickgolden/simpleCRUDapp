
const mysql = require('mysql')
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
        console.log('db', connection.state)
    }
})