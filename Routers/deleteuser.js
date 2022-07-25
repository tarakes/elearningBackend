const express=require('express');
const studentlist=require('../schema/student');
const decodeToken=require('./extracttoken');
const Deleteuserhandler=express.Router();
Deleteuserhandler.delete('/', async (req,res)=>{
    const user=await decodeToken(req);
    if(user){
 studentlist.deleteOne({classroomcode:req.headers.classroomcode,studentuid:user.uid},(err)=>{
    if(err)
    res.send([]);
    else
    res.redirect('/classroom');
})
    }
})
module.exports=Deleteuserhandler;