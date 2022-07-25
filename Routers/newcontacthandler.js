const express=require('express');
const decodeToken=require('./extracttoken');
const contactlist=require('../schema/contactlist');
const newcontacthandler=express.Router();
newcontacthandler.post("/",async (req,res)=>{
    const user=await decodeToken(req);
    if(user){
        newcontact= new contactlist({
            fromuid:user.uid,
            fromname:user.name,
            fromavatar:user.picture,
            touid:req.body.newcontact.studentuid,
            toname:req.body.newcontact.studentname,
            toavatar:req.body.newcontact.studentavatar
        });
        newcontact.save((err)=>{
            if(!err){

                res.send({
                    fromuid:user.uid,
                    fromname:user.name,
                    fromavatar:user.picture,
                    touid:req.body.newcontact.studentuid,
                    toname:req.body.newcontact.studentname,
                    toavatar:req.body.newcontact.studentavatar,
                    status:true  
                });
            }else
            res.send([]);
        })
    }else
    res.sendStatus(403);
})
module.exports=newcontacthandler;