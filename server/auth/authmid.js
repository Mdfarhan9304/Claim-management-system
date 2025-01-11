require('dotenv').config(); 
const jwt=require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = decoded; 
      console.log("Decoded user:", JSON.stringify(decoded, null, 2));

      
      next();
    } catch (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  }; 


  module.exports=authenticate
