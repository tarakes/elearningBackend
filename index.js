const express=require('express');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');
const Fetchclasshandler=require('./Routers/Fetchclasshandler');
const Createclasshandler=require('./Routers/createclass');
const Joinclasshandler=require('./Routers/joinclass');
//const Deleteuserhandler =require('./Routers/deleteuser');
//const Deleteclasshandler=require('./Routers/deleteclass');
const broadcasthandler=require('./Routers/broadcasthandler');
const posthandler=require('./Routers/posthandler');
const FetchAssHandler=require('./Routers/FetchAssHandler');
const CreateAsshandler=require('./Routers/CreateAsshandler');
const fuidhandler=require('./Routers/fuidhandler');
const viewallassHandler=require('./Routers/viewallassHandler');
const statushandler=require('./Routers/statushandler');
const submissionhandler=require('./Routers/submissionhandler');
const fetchcontacthandler=require('./Routers/fetchcontacthandler');
const newcontacthandler=require('./Routers/newcontacthandler');
const chathandler=require('./Routers/chathandler');
const savechathandler=require('./Routers/savechathandler');
const Meetdetailsfetch=require('./Routers/meetdetailsfetch');
const setCustomClaim=require('./Routers/setCustomclaim');
const studentclaim=require("./Routers/studentclaim");
const Meetsaver=require('./Routers/Meetsaver');
const decodeToken=require('./Routers/extracttoken');
const Meet = require('./schema/meet');
const Allowed=require('./schema/allowmeet');
const app=express();
const  corsOptions = {
    origin: process.env.REACT_APP_SERVER
  }
//app.use(cors(corsOptions));

const server=app.listen(process.env.PORT || 3000 ,()=>{
    console.log("server is listening....");
})
const io=require('socket.io')(server,{
    cors:{
        origin: process.env.REACT_APP_SERVER
    }
});
app.use(express.json());
mongoose
.connect(process.env.DATEBASE_URL_LOCAL)
.then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err)
})
io.on('connection',(socket)=>{
    socket.on("joinroom",async (code,token)=>{
        const req={
            headers:{
                authorization:'Bearer '+token
            }
        }
       // console.log("joinroom");
        const user=await decodeToken(req);
        if(user){
            socket.join(user.uid);
            Meet.findOne({meetcode:code},(err,doc)=>{
              //  console.log(code);
                if(!err && doc){
                   
if(doc.adminuid===user.uid){
    console.log("admin");
    socket.join(code);
socket.to(code).emit("newuser",user.uid,user.picture,user.name); }
else {
    Allowed.findOne({code:code,uid:user.uid},(error,docu)=>{
if(!error && docu){
socket.join(code);
console.log("allowed");
socket.to(code).emit("newuser",user.uid,user.picture,user.name); }
else{
console.log("grant permission from "+doc.adminuid);
io.to(user.uid).emit("plzwait",user.uid);
socket.to(doc.adminuid).emit("waiting",user.uid,user.name,user.picture);
}
    })
}
                }
            })
       //    socket.join(code);
          //  socket.to(code).emit("newuser",socket.id);
        }
    })
    socket.on("allow", (code,userid)=>{
        const person=new Allowed({
            code:code,
            uid:userid
        });
        person.save((err)=>{
            if(!err){
                socket.to(userid).emit("joinnow",code);
            }
        })
     
    })

    socket.on("remove",(id,code)=>{
socket.to(code).emit("removeFrame",id);
    })
})
app.use('/classroom',cors(corsOptions),Fetchclasshandler);
app.use('/newclass',cors(corsOptions),Createclasshandler);
app.use('/joinclass',cors(corsOptions),Joinclasshandler);
//app.use('/removeuser',Deleteuserhandler);
//app.use('/removeclass',Deleteclasshandler);
app.use('/broadcast',cors(corsOptions),broadcasthandler);
app.use('/post',cors(corsOptions),posthandler);
app.use('/assignment',cors(corsOptions),FetchAssHandler);
app.use('/facultyuid',cors(corsOptions),fuidhandler);
app.use('/newassignment',cors(corsOptions),CreateAsshandler);
app.use('/viewallassignment',cors(corsOptions),viewallassHandler);
app.use('/status',cors(corsOptions),statushandler);
app.use('/storefileurl',cors(corsOptions),submissionhandler);
app.use('/personalchat',cors(corsOptions),fetchcontacthandler);
app.use('/addtocontact',cors(corsOptions),newcontacthandler);
app.use('/chats',cors(corsOptions),chathandler);
app.use('/adminclaim',cors(corsOptions),setCustomClaim);
app.use("/studentclaim",cors(corsOptions),studentclaim);
app.use('/savechats',cors(corsOptions),savechathandler);
app.use('/meetdetail',cors(corsOptions),Meetdetailsfetch);
app.use('/storemeetinf',cors(corsOptions),Meetsaver);