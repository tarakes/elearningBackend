const express=require('express');
const decodeToken=require('./extracttoken');
const broadcast=require('../schema/broadcast');
const belongsToclass=require('./checkstudent');
const posthandler=express.Router();
posthandler.post('/',async (req,res)=>{
    const user= await decodeToken(req);
    if(user){
        const doesbelongs=await belongsToclass(req.body.classcode,user.uid);
        if(doesbelongs!==1){
            res.sendStatus(403);
            return;
        }
        const newpost=new broadcast({
            classroomcode:req.body.classcode,
            from:user.name,
            avatar:user.picture,
            data:req.body.text
        });
        newpost.save((err)=>{
            if(!err)
            res.redirect(307,'/broadcast'); 
            else
            res.send([]);
        })
    }
    else{
        res.sendStatus(403);
    }
})
module.exports=posthandler;