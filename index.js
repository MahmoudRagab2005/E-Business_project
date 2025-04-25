const express = require("express");
const mongoose = require("mongoose");
const {Students,Doctors}=require("./models")


const app = express();
app.use(express.json());

//==================================================================
const doctors = [
  {
    name: "Dr. Laila Hassan",
    age: 42,
    phone: "000-000-0001",
  },
  {
    name: "Dr. Ahmed Mostafa",
    age: 39,
    phone: "000-000-0002",
  },
  {
    name: "Dr. Mariam Fathy",
    age: 47,
    phone: "000-000-0003",
  },
];
const students = [
  {
    name: "Karim Saeed",
    age: 21,
    level: "Undergraduate",
    address: "Giza, Egypt",
  },
  {
    name: "Nour Hany",
    age: 23,
    level: "Graduate",
    address: "Mansoura, Egypt",
  },
  {
    name: "Hassan Zaki",
    age: 18,
    level: "Freshman",
    address: "Fayoum, Egypt",
  },
];



//todo Hardcoded
app.post("/student/hardcoded", (req, res) => {
  const hardcodedStudent = {
    name: "Mona Hassan",
    age: 21,
    level: "Sophomore",
    address: "Giza, Egypt",
  };
  //we wont take any data from the body
  students.push(hardcodedStudent);
  const student=new Students(hardcodedStudent)
  student.save()
  //then we will push teh new obj to our array in memory
  
  res.status(200).json({
    status: "success",
    data: hardcodedStudent,
  });
  console.log("new Student has ben added by hardcoded method")
});

//add student by body method

app.post("/student/body", (req, res) => {
  const newStudent=req.body
  if (!parseInt(req.body.age)) {
    //check if age is a number or not if it isnt then send an 400(bad request) error
    res.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if (!req.body.name || !req.body.age || !req.body.level || !req.body.address) {
    res.status(400).json({
      status: "error",
      date: "You must fill all data",
    });
    return;
  }
  const student=new Students(newStudent)
  student.save()

  students.push(newStudent)
  res.status(200).json
 ({
    status:"Success",
    data:newStudent

  })
  console.log("new Student has ben added by body method")
});

//adding doctor by param method

app.post("/doctor", (req, res) => {
  const { name, age, phone } = req.query;
  // data destruction to get needed data to create a new doctor
  if (!parseInt(age)) {
    res.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if (!name || !age || !phone) {
    res.status(400).json({
      status: "error",
      date: "You must fill all data",
    });
    return;
  }
  const newDoctor = {
    name,
    age,
    phone,
  };
  const student=new Students(newDoctor)
  student.save()
  doctors.push(newDoctor);
  res.status(200).send(console.log("new doctor has been added by param method")).json({
    status: "success",
    data: newDoctor,
  });
});



//deleting a student

app.delete("/student",async (req, res) => {
  const { Name } = req.query;
  const studentIndex =  students.findIndex((student) => student.name === Name);
  if (studentIndex === -1) {
    res.status(404).json({
      status: "error",
      data: "Student not found",
    });
    return;
  }
 await Students.findOneAndDelete({name:Name})
  students.splice(studentIndex, 1);
  res.status(200).json({
    status: "success",
    data: "Student deleted successfully",
  });
});

//editing the name of a doctor

app.patch("/doctor", async(req, res) => {
  const { oldName, newName } = req.query;

  const doctorIndex = doctors.findIndex((doctor) => doctor.name === oldName);
  if (doctorIndex === -1) {
    res.status(404).json({
      status: "error",
      data: "Doctor not found",
    });
    return;
  }
  await Doctors.findOneAndUpdate({name:oldName},{name:newName})
  doctors[doctorIndex].name = newName;
  res.status(200).json({
    status: "success",
    data: doctors[doctorIndex],
  });
});

//fetch all students

app.get("/student", (req, res) => {
  res.status(200).json({
    status: "success",
    data: students,
  });
});

//fetch all data

app.get("/Doctors_Students", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      doctors,
      students,
    },
  });
});

//connect the data to external data base
mongoose.connect("mongodb+srv://mahmoudragb859:mmmsk123711@cluster0.sfqow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
then(console.log("DB Connected"))



//this is our callback function
app.listen(3000, ()=>{
  
  console.log("server is listening on port 3000")});
// first paramter is an port for our server the second is callback
