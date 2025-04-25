const { mongoose, model } = require("mongoose")

const Schema=mongoose.Schema

const DoctorsSchema=new Schema({
    name:String,
    age:Number,
    phone:String    
})

const Doctors=new model("Doctor",DoctorsSchema)



//======================================================================================

const StudentsSchema=new Schema({
    name:String,
    age:Number,
    level:String,
    address:String
})
const Students=new model("Student",StudentsSchema)
module.exports={Doctors,Students}