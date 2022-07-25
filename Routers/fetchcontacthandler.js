const express=require('express');
const decodeToken = require('./extracttoken');
const contactlist=require('../schema/contactlist');
const studentlist=require('../schema/student');
const usermessage=require("../schema/personalchat");
const fetchcontacthandler=express.Router();
fetchcontacthandler.post("/",async(req,res)=>{
    const user=await decodeToken(req);
  //  console.log(user);
    if(user){
      
        studentlist.find({classroomcode:req.body.classroomcode},(err,doc)=>{
            if(!err){
               // console.log("1");
contactlist.find({
    $or:[
        {fromuid:user.uid},
        {touid:user.uid}
    ]
},(error,docu)=>{
    if(!error && docu.length>0){
        let conatactlistArray=[];
      //  console.log("2");
        //console.log(docu);
    //find if there any usSeen message
docu.forEach(element => {
   let otheruser;
  
   if(element.fromuid===user.uid)
   otheruser=element.touid;
   else
   otheruser=element.fromuid;
   usermessage.findOne({from:otheruser,to:user.uid,status:false},(err3,doc3)=>{
       if(!err3)
       if(doc3){
       conatactlistArray.push({
           fromuid: element.fromuid,
           fromname: element.fromname,
           fromavatar:  element.fromavatar,
           touid: element.touid,
           toname: element.toname,
           toavatar: element.toavatar,
           status:false
       }) 
    }
    else{
        conatactlistArray.push({
            fromuid: element.fromuid,
            fromname: element.fromname,
            fromavatar:  element.fromavatar,
            touid: element.touid,
            toname: element.toname,
            toavatar: element.toavatar,
            status:true
        })   
    }
    if(element===docu[docu.length-1])
    res.send({
        alluser:doc,
        mycontact:conatactlistArray
    })
   })
});
       
    }
    else{
     
    res.send({
        alluser:doc,
        mycontact:[]
    })   }
})
            }
            else
            res.send({
                alluser:[],
                mycontact:[]
            })
        })
    }
    else
    res.sendStatus(403);
})
module.exports=fetchcontacthandler;