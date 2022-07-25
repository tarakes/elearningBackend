const express=require('express');
const decodeToken=require('./extracttoken');
const studentsubmission=require('../schema/submission');
const belongsToclass=require('./checkstudent');
const checkassignment=require('./checkass');
const submissionhandler=express.Router();
submissionhandler.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
     //   console.log(req.body.link);
     const doesbelongs=await belongsToclass(req.body.classcode,user.uid);
     if(doesbelongs!==1){
       // console.log(doesbelongs);
        res.sendStatus(403);
        return;
     }
     const doesassexist=await checkassignment(req.body.classcode,req.body.serialno);
     if(doesassexist!==1){
     //  console.log(1);
        res.send([]);
        return;
     }

     try {
       const hassubmitted=await studentsubmission.findOne({classroomcode:req.body.classcode,serialno:req.body.serialno,studentuid:user.uid});
       if(hassubmitted) 
       {
        res.sendStatus(403);
      // console.log(2);
        return;
       }
     } catch (error) {
      //  console.log(3);
        console.log(error);
        res.send([]);
        return;
     }
     if(req.body.link==="")
     {
         res.send([]);
         console.log(4);
         return;
     }
        const newsubmission= new studentsubmission({
            classroomcode:req.body.classcode,
            link:req.body.link,
            serialno:req.body.serialno,
            studentuid:user.uid
        });
        newsubmission.save((err)=>{
            if(!err)
            res.send({"msg":"ok"});
            else
            res.send([]);
        })
    }
    else
    res.sendStatus(403);
})
module.exports=submissionhandler;