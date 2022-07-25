const assignmentfile=require('../schema/file');
async function checkassignment(classcode,assno){
    if(!classcode  ||  !assno){
   //     console.log("1");
    return -1;
    }
if(assno.length!==4){
  //  console.log(2);
return -1;
}
try {
    const doc=await assignmentfile.findOne({classroomcode:classcode,serialno:assno});
  //  console.log(doc);
    if(doc)
    return 1;
    else
    return 0;
} catch (error) {
    console.log(error);
    return -1;
}
}
module.exports=checkassignment;