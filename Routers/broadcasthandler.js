const express=require('express');
const broadcasthandler=express.Router();
const broadcast=require('../schema/broadcast');
const decodeToken=require('./extracttoken');
broadcasthandler.post('/',async (req,res)=>{
const user=await decodeToken(req);
if(user){
   broadcast.find({classroomcode:req.body.classcode},(err,doc)=>{
       if(!err){
           res.send(doc);
       }else{
           res.send([]);
       }
   })
}
else
res.sendStatus(403);
})

module.exports=broadcasthandler;