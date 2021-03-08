const express = require('express');
const mongoose = require('./db/mongoose');



const app = express();
let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})



const myclass = require('./db/dbmodel/myclass')
const student = require('./db/dbmodel/student')
//enable our app to parse json data format
app.use(express.json())

app.use(cors());
    //app.use('/',(req,res)=>res.send("hello from express.This is Sumit Kulkarni"))
    //posts method for creating a new student class
app.post('/myclass', (req, res) => {
    (new myclass({'className': req.body.className, 'numberOfStudents' : req.body.numberOfStudents}))
    .save()
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error))
    })

    // register a student into a class
app.post('/myclass/:myclassId/students', (req, res) =>{
    (new student ({ 'name': req.body.name, 'lastName': req.body.lastName, '_classId' : req.params.myclassId }))
    .save()
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
    })

    //read all classes
app.get('/myclass', (req, res) =>{
    myclass.find({})
    .then(myclass =>res.send(myclass))
    .catch((error) => console.log(error))
    })

//get one student class
app.get('/myclass/:myclassId', (req, res) =>{
    myclass.findOne( { _id: req.params.myclassId })
    .then(myclass =>res.send(myclass))
    .catch((error) => console.log(error))
    })    


//get all students from this classId ok then
app.get('/myclass/:myclassId/students', (req, res) =>{
    student.find({ _classId: req.params.myclassId })
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
    })
    
    
    //get one student
app.get('/myclass/:myclassId/students/:studentId', (req, res) =>{
    student.findOne({ _classId: req.params.myclassId, _id: req.params.studentId })
    .then((onestudent) => res.send(onestudent))
    .catch((error) => console.log(error))
    })



    //update student class
//$set: req.body for auto update of values in the body
app.patch('/myclass/:myclassId', (req, res) =>{
    myclass.findOneAndUpdate({ '_id' : req.params.myclassId }, {$set: req.body})
    .then((myclass) => res.send(myclass))
    .catch((error) => console.log(error))
    })

    //update student information
app.patch('/myclass/:myclassId/students/:studentId', (req, res) => {
    student.findOneAndUpdate({ '_id': req.params.myclassId, _id: req.params.studentId }, { $set: req.body })
    .then((student) => res.send(student))
    .catch((error) => console.log(error))
    })

    //deleting
    //deleteStudents = (classId) => {student.deleteMany({_id:classId})}

    app.delete('/myclass/:myclassId', (req, res) =>{
        const deleteStudents = (myclass) =>{
        student.deleteMany({ '_id': req.params.myclassId})
        .then(() => myclass)
        .catch((error) => console.log(error))
        }
        myclass.findByIdAndDelete( { '_id': req.params.myclassId})
        .then((myclass) => res.send(deleteStudents(myclass)))
        .catch((error) => console.log(error))
        })

        //delete student info
app.delete('/myclass/:myclassId/students/:studentId', (req, res) => {
    student.findOneAndDelete({ _id: req.params.studentId, _classId: req.params.myclassId }).then((student) => res.send(student))
    .catch((error) => console.log(error))
    })






