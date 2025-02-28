const express = require('express')
const connectDb = require('./db/dbController')

const app = express()
require("dotenv").config()

const port = process.env.port

connectDb()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, console.log("Server is running..."))