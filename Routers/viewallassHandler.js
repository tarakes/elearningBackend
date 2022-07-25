const express=require('express');
const decodeToken=require('./extracttoken');
const studentsubmission=require('../schema/submission');
const studentlist=require('../schema/student');
const viewallassHandler=express.Router();
const classroomlist=require('../schema/classroom');
const { getAuth } = require('firebase-admin/auth');
viewallassHandler.post("/",async(req,res,next)=>{
const user=await decodeToken(req);
if(user){
 //   console.log(user);
    classroomlist.findOne({classroomcode:req.body.classroomcode},(err,doc)=>{
        if(!err){
           // console.log(doc.facultyuid);
            if(user.uid===doc.facultyuid)
            next();
            else
            res.sendStatus(403);
        }
        else
        res.send([]);
    })
}
else
res.sendStatus(403);
},async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
        studentlist.find({classroomcode:req.body.classroomcode},(err,doc)=>{
            if(!err){
                let arr=[];
                doc.forEach(element => {
                    studentsubmission.findOne({classroomcode:req.body.classroomcode ,studentuid:element.studentuid,serialno:req.body.serialno},(err,docu)=>{
                        if(!err){
                            if(docu===null || docu===undefined){
                                if( (user.uid !== element.studentuid))
                                arr.push({
                                    name:element.studentname,
                                    status:"Not submitted",
                                    filelink:""
                                })
                            }else{
                                arr.push({
                                    name:element.studentname,
                                    status:docu.submitted,
                                    filelink:docu.link
                                })
                            }
                            if(element===doc[doc.length -1]){
                                
        getAuth().setCustomUserClaims(user.uid, {
            admin:true,
            classcode:req.body.classroomcode,
              assno: req.body.serialno
          }).then(()=>{
            //console.log("claimed");
            res.send(arr);
          }) 
                            }
                        }else res.send([]);
                    })
                });
            }
            else
            res.send([]);
        })
    }else
    res.send([]);
})
module.exports=viewallassHandler;