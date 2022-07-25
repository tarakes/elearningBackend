const studentlist=require('../schema/student');
async function belongsToclass(classcode,useruid){
    try {
        let doc= await studentlist.findOne({classroomcode:classcode,studentuid:useruid});
        if(doc)
        return 1;
        else
        return 0;
    } catch (error) {
        return -1;
    }
   
}
module.exports=belongsToclass;