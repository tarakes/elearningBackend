const express=require('express');
const decodeToken=require('./extracttoken');
const usermessage=require('../schema/personalchat');
const savechathandler=express.Router();
savechathandler.post("/",async (req,res)=>{
const user=await decodeToken(req);
if(user){
    newmsg=new usermessage({
        from:user.uid,
        to:req.body.to,
        data:req.body.text,
        status:false
    });
    newmsg.save((err)=>{
        if(!err){
            res.redirect(307,"/chats");
        }else
        res.send([]);
    })
}else
res.sendStatus(403);
})
module.exports=savechathandler;