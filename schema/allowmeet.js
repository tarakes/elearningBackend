const mongoose = require('mongoose');
const allowp=mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    uid:{
        type:String,
        require:true
    }
})
const Allowed = new mongoose.model("allowmeetperson",allowp);
    module.exports=Allowed;