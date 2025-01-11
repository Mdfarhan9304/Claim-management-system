require('dotenv').config(); 
const User= require('../models/User')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')



const register = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(req.body);
  
  
      const hashPwd = await bcrypt.hash(password, 10);
  

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(411).json({
          message: "User already exists",
        });
      }
  

      const newUser = new User({
        email,
        password: hashPwd,
        role,
      });
  
  
      await newUser.save();
  
      
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
   
      );
  
    
      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error during registration" });
    }
  };
  
  const login = async (req, res) => {
    console.log("Reached here");
  
    try {
      const { email, password } = req.body;
  
   
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
   
      );
  
   
      res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  


module.exports= {
    register,
    login,
}