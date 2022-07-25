const mongoose = require('mongoose');
const filelink = mongoose.Schema({
    classroomcode:{
        type:String,
        require:true,
    },
    posted:{
        type:Date,
        default: Date.now,
        require:true,
    },
    facultyuid:{
        type:String,
        require:true,
    },
    serialno:{
        type:String,
        require:true,
    },
    lastdate:{
        type:Date,
        require:true,
    },
    link:{
        type:String,
        require:true,
    },
    heading:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    }
    });
    const assignmentfile = new mongoose.model("assignmentlink",filelink);
    module.exports=assignmentfile;