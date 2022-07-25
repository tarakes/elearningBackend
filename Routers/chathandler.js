const express=require('express');
const decodeToken=require('./extracttoken');
const usermessage=require('../schema/personalchat');
const newcontacthandler=express.Router();
newcontacthandler.post("/",async(req,res)=>{
    const user=await decodeToken(req);
    if(user){
        usermessage.find({
            $or:[
                {from:user.uid,to:req.body.to},
                {from:req.body.to,to:user.uid}
            ]
        },(err,doc)=>{
            if(!err){
                try {
                    //if receiver is fetching message then set  hasSeen true
                    if(doc.length>0)
                    doc.forEach(async element => {
                        if(element.to===user.uid){    
                        element.status=true;
                      await  element.save();
                        }
                        //if it was last element
                        if(element===doc[doc.length-1])
                        res.send(doc);  
                    });   
                    else
                    res.send([]);
                } catch (error) {
                   console.log(error); 
                }
             
                    
            }else{
                res.send([]);
            }
        })
    }else{
        res.sendStatus(403);
    }
})
module.exports=newcontacthandler;