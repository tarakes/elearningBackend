const express=require('express');
const classroomlist=require('../schema/classroom');
const studentlist=require('../schema/student');
const Deleteclasshandler=express.Router();
const decodeToken=require('./extracttoken');
Deleteclasshandler.delete('/',async (req,res)=>{
    const user=await decodeToken(req);
    if(user){
        classroomlist.deleteOne({ classroomcode:req.headers.classroomcode,facultyuid:user.uid},(err)=>{
            if(err)
            res.send([]);
           else{
               res.redirect('/removeuser');
           }
        })
    }
    else
    res.send([]);
})
module.exports=Deleteclasshandler;