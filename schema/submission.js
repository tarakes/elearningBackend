const mongoose = require('mongoose');
const submissionlink = mongoose.Schema({
    classroomcode:{
        type:String,
        require:true,
    },
    submitted:{
        type:Date,
        default: Date.now,
        require:true,
    },
    link:{
        type:String,
        require:true,
    },
    serialno:{
type:String,
require:true,
    },
 studentuid: {
    type:String,
    require:true,
    }
    });
    const studentsubmission = new mongoose.model("filesubmissionlink",submissionlink);
    module.exports=studentsubmission;