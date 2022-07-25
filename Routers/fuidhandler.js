const express=require('express');
const decodeToken = require('./extracttoken');
const classroomlist=require('../schema/classroom');
const belongsToclass=require('./checkstudent');
const fuidhandler=express.Router();
fuidhandler.post("/",async (req,res)=>{
    const user=await decodeToken(req);
    if(user){
        const doesbelongs=await belongsToclass(req.body.classroomcode,user.uid);
        if(doesbelongs!==1){
            res.sendStatus(403);
            return;
        }
        classroomlist.findOne({classroomcode:req.body.classroomcode},(err,doc)=>{
          //  console.log(doc);
            if(!err){
            //    console.log(doc.facultyuid);
            res.send(doc.facultyuid);
            }
            else
            res.send([]);
        })
    }else
    res.send([]);
})
module.exports=fuidhandler;