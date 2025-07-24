const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

//Register new user function
const adminRegister = async (req, res) =>{
   try {
     const {name, email, password} = req.body
     //validate input
     if(!name || !email || !password){
        return res.status(400).json({errorMessage: "All Fields Required"})
     }
     //password legnth
     if(password.length < 6){
        return res.status(400).json({errorMessage: "Password must be more than Six(6) characters"})
     }
     //checking if user or email aleready exists
     const existingUser = await User.findOne({email})
     if(existingUser){
        return res.status(400).json({errorMessage: "An account with this email already exists"})
     }

     //hashing user password
     const salt = await bcrypt.genSalt()
     const hashedPassword = await bcrypt.hash(password,salt)
     //adding new user
     const newUser = new User({
        name,
        email,
        password: hashedPassword
     })
     const savedUser = await newUser.save()

     //********************** */
     const token = jwt.sign(
        {
            user:savedUser._id
        },
        process.env.jwt_secret
     )
     //sending Token in HTTP-only cookie
     res.cookie("token", token, {
        httpOnly: true,  
     }).send()

     
   } catch (error) {
    res.status(500).json(error)
   }
}
  //login function

  const adminLogin = async(req, res) =>{
    try {
        const {email, password} = req.body
        //validate input
     if(!email || !password){
        return res.status(400).json({errorMessage: "All Fields Required"})
     }
     //checking if user exsit or email is correct
     const existingUser = await User.findOne({email})
     if(!existingUser){
        return res.status(400).json({errorMessage: "Wrong Email or Password"})
     }
     //decrypt and compare passwords using Bcrypt
     const confirmPassword = await bcrypt.compare(password, existingUser.password)
     if(!confirmPassword){
         return res.status(400).json({errorMessage: "Wrong Email or Password"})
     }

     //sigin token ******************************************
     const token = jwt.sign(
        {
            user:existingUser._id
        },
        process.env.jwt_secret,
        { expiresIn: '1h' }
     )
     //sending Token in HTTP-only cookie
     res.cookie("token", token, {

         httpOnly: true,
      secure: true, // Requires HTTPS
  sameSite: 'none', // Needed for cross-site cookies (if frontend/backend are on different domains)
   
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
     }).json({
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,

      }
    });

    } catch (error) {
        
    }

  }

  //loggedIn function

  const adminLoggedIn = async (req,res) =>{
     try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.json({ isLoggedIn: false });
    }

    const verified = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(verified.user).select('-password');

    if (!user) {
      return res.json({ isLoggedIn: false });
    }

    res.json({
      isLoggedIn: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.json({ isLoggedIn: false });
  }
  }


//logout functiom
const adminlogout = async (req, res) =>{
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
}


module.exports = {
    adminRegister,
    adminLogin,
    adminlogout,
    adminLoggedIn
}