const express=require('express');
const setCustomClaim=express.Router();
const decodeToken=require("./extracttoken");
const assignmentfile=require("../schema/file");
const classroomlist=require("../schema/classroom");
const studentsubmission=require("../schema/submission");
const { getAuth } = require('firebase-admin/auth');
const studentlist=require("../schema/student");
const studentclaim=express.Router();


studentclaim.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(!user)
    res.sendStatus(403);
    else{
        //check if student exist
studentlist.findOne({classroomcode:req.body.classcode,studentuid:user.uid},(err1,doc1)=>{
if(!err1 && doc1){
    //check if assignment exist
    assignmentfile.findOne({classroomcode:req.body.classcode, serialno:req.body.serialno},(err2,doc2)=>{
        if(!err2 && doc2){
//check if already submitted or not
studentsubmission.findOne({ classroomcode:req.body.classcode,serialno:req.body.serialno,studentuid:user.uid},(err3,doc3)=>{
    if(!err3 && !doc3){
        getAuth().setCustomUserClaims(user.uid, {
            student:true,
            classcode:req.body.classcode,
              assno: req.body.serialno
          }).then(()=>{
          //  console.log("student claimed");
            res.send({status:"success"});
          }) 
        
    }
    else
        res.sendStatus(403);
})
        }else
        res.sendStatus(403);
    })
}
})
    }
})

module.exports=studentclaim;