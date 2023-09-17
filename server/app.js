const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');

const dbservices = require('./dbService')

const {getNote,
    getNotes,
    insertRow,} = require('./dbService')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/insert', async (req, res) =>{
    const { name } = req.body
    
    const id = await insertRow(name)
    console.log("id", id)
    const nameDetails = await getNote(id);
    console.log("details", nameDetails)
    res.status(200).json({success: true,
        data: nameDetails[0]
    })
})

app.get("/getAll", async (req, res) =>{
    const j = await getNotes()
    console.log(j)
    res.status(200).json({ success: true,
        data: j })
})

app.use((err, req, res, next ) => {
    console.log(err.stack)
    res.status(500).send('something went wrong')
})
app.listen(process.env.envPORT, 
    () => console.log(`listening ${process.env.envPORT}`))