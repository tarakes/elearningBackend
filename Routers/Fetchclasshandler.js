const express=require('express');
const Fetchclasshandler=express.Router();
const decodeToken=require('./extracttoken');
const studentlist=require('../schema/student');
const classroomlist=require('../schema/classroom');
Fetchclasshandler.get('/', async (req,res)=>{
 //   console.log(req.headers);
    const user=await decodeToken(req);
  // console.log(user);
    if(user)
  studentlist.find({studentuid:user.uid},(err,doc)=>{
       if(err)
       res.send([]);
       else if(doc.length>0)
       {
           let arr=[];
   
            doc.forEach((element) => {
                classroomlist.findOne({classroomcode:element.classroomcode},(error,document)=>{
                              if(!error){
                                 // console.log(doc);
                              arr.push(document);
                             // console.log(doc);
                         if(element===doc[doc.length - 1])
                         res.send({arr:arr,user:user.uid});
                           // console.log(doc[doc.length-1]);
                          //  console.log(element);
                              }
                              
                          }) 
                         
                       });
        
           
       }
       else
       res.send({arr:[],user:user.uid});
    })
    else
    res.send([]);
})
module.exports=Fetchclasshandler;
