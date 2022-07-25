const classroomlist=require('../schema/classroom');
async function checkclasexist(classcode){
    if(!classcode)
    return -1;
    if(classcode.length!==6)
    return -1;
try {
    let doc=await classroomlist.findOne({classroomcode:classcode});
    if(doc)
    return 1;
    else
    return 0;
} catch (error) {
    return -1;
}
}
module.exports=checkclasexist;