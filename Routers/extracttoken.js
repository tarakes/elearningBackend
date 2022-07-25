const admin=require('../firebaseconfig');
async function decodeToken(req){
try{
    const decodevalue= await admin.auth().verifyIdToken(req.headers.authorization.split(" ")[1]);
   // console.log(decodevalue);
if(decodevalue)
return decodevalue;
else
return undefined;
}
catch(err){
    console.log(err);
}
}
module.exports=decodeToken;