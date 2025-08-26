const express = require('express');
const controller = require('./controller')
const app = express();
app.use(express.json());

app.post('/insert', controller.insertdata);
app.get('/getAllStudents', controller.getAllStudents);
app.get('/getStudentByRollNo', controller.getStudentByRollNo);
app.get('/checkIfDataIsPresent',controller.checkIfDataIsPresent);
app.delete('/deleteStudent', controller.deleteStudent);
 
app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("params Checked")
})

app.listen(3000);