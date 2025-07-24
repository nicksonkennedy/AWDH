const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT
const cors = require("cors");
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser")
// database connection
connectDB()

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

const HOST = '0.0.0.0';
// cors config
app.use(cors({
    origin: "https://atiwawesthospital.vercel.app",//URL of the react App
    credentials: true
  }))

//authentication Routes
app.use('/', require('./routes/authRoute'))
//
app.use('/complaints', require('./routes/complaintRoute'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}:${HOST}`))