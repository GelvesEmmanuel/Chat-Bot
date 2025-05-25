const mongoose= require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("conectado a mongoDB")
    }catch(error){
        console.log("error al conectar mongoDB", error)
        process.exit(1)
    }

}
module.exports = connectDB