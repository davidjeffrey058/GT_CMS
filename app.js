const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DBURI)
.then((result) => {
    console.log('Connected')
    app.listen(process.env.PORT)
})
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to GTCMS'})
})

app.use((req, res) => {
    res.status(404).json({error: 'Invalid path'})
})

