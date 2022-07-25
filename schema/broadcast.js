const mongoose = require('mongoose');
const message = mongoose.Schema({
    classroomcode:{
        type:String,
        require:true,
    },
    from:{
        type:String,
        require:true,
    },
    avatar:{
        type:String,
        require:true,
    },
    data:{
        type:String,
        require:true,
    },
    time:{
        type:Date,
        default: Date.now,
        require:true,
    }
    });
    const broadcast = new mongoose.model("classroombroadcast",message);
    module.exports=broadcast;