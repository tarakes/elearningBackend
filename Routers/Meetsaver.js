const express=require('express');
const decodeToken=require('./extracttoken');
const Meet=require('../schema/meet');
const Meetsaver=express.Router();
Meetsaver.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
        Meet.findOne({meetcode:req.body.code},(err,doc)=>{
            if(!err){
            if(doc)
            res.send({msg:"fail"});
            else{
                const newmeet=new Meet({
                    adminuid:user.uid,
                    meetcode:req.body.code
                });
                newmeet.save((err)=>{
                    if(!err){
                        res.send({"msg":"ok"});
                    }else
                    res.send([]);
                })
            }
            }  
        })
       
    }else
    res.sendStatus(403);
})
module.exports=Meetsaver;