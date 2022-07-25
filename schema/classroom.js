const mongoose = require('mongoose');
const classroom = mongoose.Schema({
    classroomcode:{
        type:String,
        require:true,
    },
    subject:{
        type:String,
        require:true,
    },
    facultyname:{
        type:String,
        require:true,
    },
    facultyuid:{
        type:String,
        require:true,    
    },
    facultyavatar:{
        type:String,
        require:true,
    },
    facultyemail:{
        type:String,
        require:true
    }
    });
    const classroomlist = new mongoose.model("classroomdetail",classroom);
    module.exports=classroomlist;