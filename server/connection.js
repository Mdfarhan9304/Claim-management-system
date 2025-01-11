const mongoose= require('mongoose')


const  dbConnect= async ()=>{
    mongoose.connect(
        "mongodb+srv://mdfarhan9304:IJImE2vzHsPgPQ67@cluster0.cjeseyh.mongodb.net/assignment"
    )
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

module.exports=dbConnect