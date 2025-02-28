const express = require('express')
const connectDb = require('./db/dbController')
const err = require('./middleware/errorHandler.')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter')
const kycRouter = require('./routers/kycRouter')
const cookieParser = require("cookie-parser");

const app = express()
require("dotenv").config()

const port = process.env.port

connectDb()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api", userRouter)
app.use("/api", authRouter)
app.use("/api", postRouter)
app.use("/api", kycRouter)

app.use(err)

app.listen(port, console.log("Server is running..."))