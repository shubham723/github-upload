const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const blogs = new Schema ({
    id:{type:mongoose.Types.ObjectId},
    title:{type:String},
    short_desc:{type:String},
    author:{type: String},
    pic:{type:String},
    dob:{type:Date},
    created_at:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Blog",blogs);