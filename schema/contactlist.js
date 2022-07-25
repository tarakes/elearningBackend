const mongoose = require('mongoose');
const contactpair = mongoose.Schema({
    fromuid:{
        type:String,
        require:true,
    },
    fromname:{
        type:String,
        require:true,   
    },
    fromavatar:{
        type:String,
        require:true,
    },
    touid:{
        type:String,
        require:true,
    },
    toname:{
        type:String,
        require:true,
    },
    toavatar:{
        type:String,
        require:true,
    }
    });
    const contactlist = new mongoose.model("personalcontactlist",contactpair);
    module.exports=contactlist;