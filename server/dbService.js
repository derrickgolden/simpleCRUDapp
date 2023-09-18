
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
    return result;
}
const getName = async (name) =>{
    try {
        const [result] = await pool.query(`
            SELECT * FROM crud_app
            WHERE name =?`, [name])
        return result;
    } catch (error) {
        console.log(error)
    }
}

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
    return res.insertId;
}

const deleteRow = async(id) =>{
    id = parseInt(id, 10);
    try {
        const [res] = await pool.query(`
        DELETE FROM crud_app
        WHERE id = ?`, [id])        

        return res
    } catch (error) {
        console.log(error)
    }
}
const updateRow = async(id, name) =>{
    id = parseInt(id, 10);
    try {
        const [res] = await pool.query(`
        UPDATE crud_app
        SET name = (?)
        WHERE id = ?`, [name, id])        

        return res.affectedRows === 1
    } catch (error) {
        console.log(error)
        return false;
    }
}


module.exports = {
    getNote,
    getName,
    getNotes,
    insertRow,
    deleteRow,
    updateRow
}