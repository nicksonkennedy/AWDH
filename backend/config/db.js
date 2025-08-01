const mongoose = require('mongoose');

const connectDB = async()  =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Connected", connect.connection.host, connect.connection.name)

    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB