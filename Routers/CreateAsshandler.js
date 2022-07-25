const express=require('express');
const decodeToken=require('./extracttoken');
const CreateAsshandler=express.Router();
const assignmentfile=require('../schema/file');
const checkassignment=require('./checkass');
const classroomlist=require('../schema/classroom');
CreateAsshandler.post("/",async (req,res,next)=>{
    const user=await decodeToken(req);
    if(user){
        const doesexist=await checkassignment(req.body.classcode,req.body.serialno);
        if(doesexist!==0){
            res.send([]);
            return;
        }
classroomlist.findOne({classroomcode:req.body.classcode},(err,doc)=>{
    if(!err){
        if(doc.facultyuid===user.uid)
        next();
        else
        res.sendStatus(403);
    }else
    res.send([]);
})
    }
},async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
        let details= {
            classroomcode:req.body.classcode,
            facultyuid:user.uid,
            serialno:req.body.serialno,
            lastdate:req.body.lastdate,
            link:req.body.filelink,
            heading:req.body.heading,
            description:req.body.description
            }
const newass= new assignmentfile(details);
newass.save((err)=>{
    if(!err){
console.log("assignment craeted")
    res.send(details);

    }
    else
    res.send([]);
})
    }
})
module.exports=CreateAsshandler;