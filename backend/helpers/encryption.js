const bcrypt = require('bcrypt')

// creating new hash password
const hashpassword = async(password) =>{
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

//comparing
const comparePassword = (password, hashed) =>{
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashpassword,
    comparePassword
}