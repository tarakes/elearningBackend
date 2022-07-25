const express=require('express');
const setCustomClaim=express.Router();
const decodeToken=require("./extracttoken");
const assignmentfile=require("../schema/file");
const classroomlist=require("../schema/classroom");
const { getAuth } = require('firebase-admin/auth');
setCustomClaim.post("/",async(req,res)=>{
    //console.log("user");
   const user=await decodeToken(req);
   if(!user){
   res.sendStatus(403);
   return;
   }
   

   try {
    let flag=false;
    classroomlist.findOne({classroomcode:req.body.classcode},(err,doc)=>{
     //   console.log(err,doc);
        if(!err && doc){
           // console.log(user.uid);
           if(doc.facultyuid===user.uid)
          {
            assignmentfile.findOne({classroomcode:req.body.classcode,serialno:req.body.serialno},(error,document)=>{
               //console.log(error,document);
                if(!error){
                    if(document){
                        console.log("document alreday exist");
                    res.send({status:"fail"});
                    }
                    else{
                        getAuth().setCustomUserClaims(user.uid, {
                            admin:true,
                            classcode:req.body.classcode,
                              assno: req.body.serialno
                          }).then(()=>{
                          //  console.log("claimed");
                            res.send({status:"success"});
                          }) 
                        
                    
                    }
                }else{
                    console.log(error);
                res.send();
                }
            })
          } 
        }else{
            console.log(err);
        res.send();

        }
    })
   
   /*              
    admin:true,
        classcode:req.body.classcode,
          assno: req.body.serialno
   */ 
  //console.log("breakpoint");
        
        //  console.log("user");
   } catch (error) {
     console.log(error);  
   }
   
//admin.setCustomClaim()
})

module.exports=setCustomClaim;





