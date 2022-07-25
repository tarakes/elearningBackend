const express=require('express');
const decodeToken=require('./extracttoken');
const assignmentfile=require('../schema/file');
const belongsToclass=require('./checkstudent');
const FetchAssHandler=express.Router();
FetchAssHandler.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
        const doesbelongs=await belongsToclass(req.body.classroomcode,user.uid);
        if(doesbelongs!==1)
        {
            console.log(doesbelongs);
            res.sendStatus(403);
            return;
        }
        assignmentfile.find({classroomcode:req.body.classroomcode},(err,doc)=>{
            if(!err){
               // console.log(doc);
                res.send(doc);
              
            }
            else
            res.send([]);
        })
    }
    else
    res.send([]);
})
module.exports=FetchAssHandler;