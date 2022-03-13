const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/students.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const url = "mongodb://localhost:27017/studentsDB";

//READ OPERATION
app.get("/api/StudentInfo", async (req,res)=>{

    try{
        await mongoose.connect(url);
        console.log("Database connected");
        Student.find((err, students)=>{
            if(err) console.log(err);
            else {
                console.log(students);
                res.send(students);
                mongoose.connection.close();
            }
        })
    }
    catch(error){
        console.log(error);
    }
   
})

//CREATE DATA
app.post("/api/StudentInfo", async (req,res)=>{
    try{
      
        const {first_name, last_name,age} = req.body;
        console.log(first_name, last_name,age);
        const student = new Student({
            first_name: first_name,
            last_name: last_name,
            age: age
        });

        await mongoose.connect(url);
        console.log("Database connected");
        student.save((err)=>{
           if(err){
               console.log(err);
               res.send(err);
           }
           else{
                console.log("The document inserted successfully");
                res.send(student);
                mongoose.connection.close();
           }
       });
    }
    catch(error){
        console.log(error);
    }
})

//UPDATE DATA
app.put("/api/StudentInfo/:id", async (req,res)=>{
    try{
           let _id = req.params.id;
           _id = mongoose.Types.ObjectId(_id);
           console.log(_id);

           const {first_name, last_name, age} = req.body
           await mongoose.connect(url);
            console.log("Database connected");
           Student.updateOne(
               {_id: _id},
               {first_name: first_name,
                last_name: last_name, 
                age: age},
                (err)=>{
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                         console.log("The document updated successfully");
                         res.send("The document updated successfully");
                         mongoose.connection.close();
                    }
                });
        }
    catch(error){
        console.log(error);
    }
});

//DELETE DATA
app.delete("/api/StudentInfo/:id", async (req,res)=>{
    try{
           let _id = req.params.id;
           _id = mongoose.Types.ObjectId(_id);
           console.log(_id);

         
           await mongoose.connect(url);
            console.log("Database connected");
           Student.deleteOne(
               {_id: _id},
               (err)=>{
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                         console.log("The document deleted successfully");
                         res.send("The document deleted successfully");
                         mongoose.connection.close();
                    }
                });
        }
    catch(error){
        console.log(error);
    }
});
app.listen(5000, ()=>{
    console.log("the server is up and listening on port 5000");
})