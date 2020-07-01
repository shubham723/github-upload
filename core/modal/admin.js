const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema ({
    id:{type:mongoose.Types.ObjectId},
    username:{type:String},
    password:{type:String}
})

module.exports = mongoose.model("Admin",admin);