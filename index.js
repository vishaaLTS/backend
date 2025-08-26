const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Student1DB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Connection Error", err));

// Schema
const student1Schema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  rollno: String
});

// Model
const Student1 = mongoose.model("student1", student1Schema);

// Insert student
app.post("/insert", async (req, res) => {
  const { name, age, department, rollno } = req.body;
  try {
    const newStudent1 = new Student1({ name, age, department, rollno });
    await newStudent1.save();
    console.log("Inserted:", newStudent1);
    res.status(201).send("Student data inserted");
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(400).send("Error inserting data");
  }
});

// Get all students
app.get("/getAllStudents", async (req, res) => {
  try {
    const data = await Student1.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).send("Error fetching data");
  }
});

// Get student by roll number
app.get("/getStudent/:rollno", async (req, res) => {
  try {
    const student1 = await Student1.findOne({ rollno: req.params.rollno });
    if (!student1) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student1);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).send("Error fetching student");
  }
});


app.delete("/deleteStudent/:rollno", async (req, res) => {
  try {
    const deletedStudent = await Student1.findOneAndDelete({ rollno: req.params.rollno });
    if (!deletedStudent) {
      return res.status(404).send("Student not found");
    }
    res.status(200).send(`Student with rollno ${req.params.rollno} deleted successfully`);
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).send("Error deleting student");
  }
});

 app.put("/updateStudent/:rollno", async (req, res) => {
  try {
    const updatedStudent = await Student1.findOneAndUpdate(
      { rollno: req.params.rollno },   
      req.body,                       
      { new: true }                   
    );

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send("Error updating student");
  }
});


app.listen(3000)
