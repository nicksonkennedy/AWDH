const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
         name:{
            type: String,
            required: [true, "Please Enter Name ....."]
        },
        email:{
            type: String,
            required: [true, "Please Enter Email Address..."],
            unique: true
        },
        password:{
            type: String,
            required: [true, "Please Enter Password ....."]
        }
}
,
        {timestamps: true}
)

const User = mongoose.model("user", userSchema)
module.exports = User