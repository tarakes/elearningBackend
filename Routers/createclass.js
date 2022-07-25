const express=require('express');
const classroomlist = require('../schema/classroom');
const decodeToken=require('./extracttoken');
const checkclasexist=require("./classcheck");
const Createclasshandler=express.Router();
Createclasshandler.post('/', async (req,res)=>{
 //   console.log(req.headers);
  //  console.log(req.body);
const  user=await decodeToken(req);
if(user){
  //  console.log(user);
  const doesexist=await checkclasexist(req.body.classroomcode);
  if(doesexist!==0){
    res.send([]);
    return;
  }
    const newclass=new classroomlist({
        classroomcode:req.body.classroomcode,
        subject:req.body.subject,
        facultyname: user.name,
        facultyuid:user.uid,
        facultyavatar:user.picture,
        facultyemail:user.email
    });
   newclass.save((err)=>{
        if(err)
        res.send([]);
        else
        res.redirect(307,'/joinclass');
    })
}
else
res.sendStatus(403);
})
module.exports=Createclasshandler;