
const mysql = require('mysql2')
require('dotenv').config()

// const connection = mysql.createConnection({
//     host: process.env.envHOST,
//     user: process.env.envUSER,
//     password: process.env.envPASSWORD,
//     database: process.env.envDATABASE,
//     port: process.env.DB_PORT
// })

// connection.connect((err) => {
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log('db', connection.sqlMessage)
//     }
// })

const pool = mysql.createPool({
    host: process.env.envHOST,
    user: process.env.envUSER,
    password: process.env.envPASSWORD,
    database: process.env.envDATABASE,
}).promise()

const getNotes = async () =>{
    const [result] = await pool.query("SELECT * FROM crud_app")
    // console.log(result)
    return result;
}
// getNotes()

const getNote = async (id) =>{
    const [result] = await pool.query(
        `SELECT * FROM crud_app
        where id = ?`, [id])
    return result;
}
// getNote(4)

const insertRow  = async(name, )=> {
    const  date_added = new Date();

    const [res] = await pool.query(`
    INSERT INTO crud_app (name, date_added)
    values(?, ?)`,[name, date_added])
    // console.log(res.insertId)
    return res.insertId;
}
// insertRow('test2', 'test insert')

module.exports = {
    getNote,
    getNotes,
    insertRow,
}