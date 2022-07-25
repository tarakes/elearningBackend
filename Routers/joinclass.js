const express=require('express');
const studentlist=require('../schema/student');
const studentemaillist=require("../schema/studentemail");
const decodeToken=require('./extracttoken');
const checkclasexist=require("./classcheck");
const Joinclasshandler=express.Router();
Joinclasshandler.post('/', async (req,res)=>{
   // console.log(req.headers);
   // console.log(req.body);
    const  user=await decodeToken(req);
    if(user){
        //console.log(user);
        const doesexist=await checkclasexist(req.body.classroomcode);
        if(doesexist!==1)
        {
            console.log(doesexist);
            res.send([]);
            return;
        }
        const student=new studentlist({
            classroomcode:req.body.classroomcode,
            studentname:user.name,
            studentuid:user.uid,
            studentavatar:user.picture
        });
        const studentwithEmail=new studentemaillist({
            classroomcode:req.body.classroomcode,
            studentname:user.name,
            studentuid:user.uid,
            studentavatar:user.picture,
            studentemail:user.email 
        })
       student.save((err)=>{
            if(err)
            res.send([]);
            else
          {
              studentwithEmail.save((err2)=>{
                  if(!err2)
                  res.redirect('/classroom');
                  else
                  res.send([]);
              })
          }
        })
    }
    else
    res.sendStatus(403);
})
module.exports=Joinclasshandler;