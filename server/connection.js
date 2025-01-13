require('dotenv').config();
const mongoose= require('mongoose')


const  dbConnect= async ()=>{
    mongoose.connect(
        process.env.MONGO_URL
    )
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

module.exports=dbConnect