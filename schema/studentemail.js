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
    },
    studentemail:{
        type:String,
        require:true
    }
    });
    const studentemaillist = new mongoose.model("studentemail",student);
    module.exports=studentemaillist;