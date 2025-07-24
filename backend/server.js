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
const allowedOrigins = [
  "https://atiwawesthospital.vercel.app", // Prod
  "https://www.atiwawesthospital.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

//authentication Routes
app.use('/', require('./routes/authRoute'))
//
app.use('/complaints', require('./routes/complaintRoute'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}:${HOST}`))