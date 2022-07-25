const express=require('express');
const decodeToken=require('./extracttoken');
const Meet=require('../schema/meet');
const Meetdetailsfetch=express.Router();
Meetdetailsfetch.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
      //  console.log("user arrive");
Meet.findOne({meetcode:req.body.code},(err,doc)=>{
if(!err && doc){
    if(doc.adminuid===user.uid)
    res.send(true);
    else
    res.send(false);
}else
res.send([]);
})
    }else
    res.sendStatus(403);
})
module.exports=Meetdetailsfetch;


