const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const adminBlog = new Schema ({
    id:{type:mongoose.Types.ObjectId},
    title:{type:String},
    user_id:{type:Number},
    description:{type:String},
    is_featured:{type:Boolean},
    is_active:{type:Boolean}
})

module.exports = mongoose.model("adminblog",adminBlog);