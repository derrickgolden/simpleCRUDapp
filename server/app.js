const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');

const dbservices = require('./dbService')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/getAll", (req, res) =>{
    console.log('test')
    res.status(200).json({ success: true,
        data: [{id: 1, name: "Derrick", date_added: "October 13, 2014 11:13:00"}]})
})

app.listen(process.env.envPORT, 
    () => console.log(`listening ${process.env.envPORT}`))