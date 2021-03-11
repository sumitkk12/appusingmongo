const express = require('express');
const mongoose = require('./db/mongoose');
var cors = require('cors');


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
app.post('/myclass', async(req, res) => {
   const result =  await (new myclass({'className': req.body.className, 'numberOfStudents' : req.body.numberOfStudents}))
    .save()
    res.json(result);
    })

    // register a student into a class
app.post('/myclass/:myclassId/students', async(req, res) =>{
    const result = await (new student ({ 'name': req.body.name, 'lastName': req.body.lastName, '_classId' : req.params.myclassId }))
    .save()
    res.json(result);
    })

    //read all classes
app.get('/myclass', async(req, res) =>{
   const result =  await myclass.find({})
    res.json(result);
    })

//get one student class
app.get('/myclass/:myclassId', async(req, res) =>{
    const result = await myclass.findOne( { _id: req.params.myclassId })
    res.json(result)
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
app.patch('/myclass/:myclassId', async(req, res) =>{
  let result= await myclass.findOneAndUpdate({ '_id' : req.params.myclassId }, {$set: req.body})
    res.json(result);
    })

//update student information
app.patch('/myclass/:myclassId/students/:studentId', async(req, res) => {
  let result11 =  await student.findOneAndUpdate({ '_id': req.params.myclassId, _id: req.params.studentId }, { $set: req.body })
  res.send("updated the student info"); 
 })




   
        //deleting
    //deleteStudents = (classId) => {student.deleteMany({_id:classId})}

    app.delete('/myclass/:myclassId', async(req, res) =>{
        const deleteStudents = async(myclass) =>{
        await student.deleteMany({ '_id': req.params.myclassId},()=>{
            return myclass;
        })
        
        //.then(() => myclass)
        //.catch((error) => console.log(error))
        }
        await myclass.findByIdAndDelete( { '_id': req.params.myclassId},(err,doc)=>{
            deleteStudents(doc);
            res.send(doc);
        })
        
        })
       // .then((myclass) => res.send(deleteStudents(myclass)))
        //.catch((error) => console.log(error))
        //delete student info
app.delete('/myclass/:myclassId/students/:studentId', async(req, res) => {
     await student.findOneAndDelete({ _id: req.params.studentId, _classId: req.params.myclassId },(docs)=>{
        res.send("student successfully deleted");
     })
    
    })





