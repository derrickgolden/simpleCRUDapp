const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');

const dbservices = require('./dbService')

const {getNote, getName,
        getNotes, updateRow,
        insertRow, deleteRow } = require('./dbService')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('index.html'))

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

app.delete('/delete/:id', async(req, res) =>{
    let {id} = req.params;
    // console.log(id)
    try {
        const response = await deleteRow(id)
        res.status(200).json({success: true,
            data: response})
        } 
    catch (error) {
        res.status(301).json({success: false,
            data: error})
        console.log(error)
    }
})

app.patch('/update', async(req, res) =>{
    const {id, name } = req.body;
    console.log(name)

    const response = await updateRow(id, name)
    console.log(response)
    res.status(200).json({success: response})
})

app.get("/getAll", async (req, res) =>{
    res.setHeader("Access-Control-Allow-Credentials", "true")
    const allNames = await getNotes()
    
    res.status(200).json({ success: true,
        data: allNames })
    })

app.get("/search/:searchValue", async (req, res) =>{
    const {searchValue} = req.params
    console.log(searchValue)
    const name = await getName(searchValue)
    
    res.status(200).json({ success: true,
        data: name })
})

app.use((err, req, res, next ) => {
    console.log(err.stack)
    res.status(500).send('something went wrong')
})
app.listen(process.env.envPORT, 
    () => console.log(`listening ${process.env.envPORT}`))