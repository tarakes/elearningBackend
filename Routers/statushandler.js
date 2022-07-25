const express=require('express');
const decodeToken=require('./extracttoken');
const studentsubmission=require('../schema/submission');
const statushandler=express.Router();
statushandler.post("/",async (req,res)=>{
    const user=await decodeToken(req);
    if(user){
        studentsubmission.findOne({classroomcode:req.body.classcode,studentuid:user.uid,serialno:req.body.assignment},(err,doc)=>{
            if(!err){
                if(doc)
                res.send(true);
                else
                res.send(false);
            }else
            res.send([]);
        })
    }else
    res.sendStatus(403);
})
module.exports=statushandler;