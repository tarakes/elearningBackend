const mongoose = require('mongoose');
const meetinf = mongoose.Schema({
    adminuid:{
        type:String,
        require:true,
    },
meetcode:{
    type:String,
    require:true
}
});
const Meet = new mongoose.model("meetinformation",meetinf);
    module.exports=Meet;