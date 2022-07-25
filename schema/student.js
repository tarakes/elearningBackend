const mongoose = require('mongoose');
const student = mongoose.Schema({
    classroomcode:{
        type:String,
        require:true,
    },
    studentname:{
        type:String,
        require:true,
    },
    studentuid:{
        type:String,
        require:true
    },
    studentavatar:{
        type:String,
        require:true
    }
    });
    const studentlist = new mongoose.model("studentinformation",student);
    module.exports=studentlist;