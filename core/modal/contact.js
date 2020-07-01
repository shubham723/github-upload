const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const contact = new Schema({
    id:{type:mongoose.Types.ObjectId},
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    userid:{type: mongoose.Schema.Types.ObjectId, ref:'Admin'},
    blogid:{type: mongoose.Schema.Types.ObjectId, ref:'Blog'},
    message:{type:String}
});

module.exports = mongoose.model("Contact",contact);