const model = require('../../modal/adminBlog');
const mongoose = require('mongoose');

// add new blog
module.exports = async(blog) => {
    blog._id=new mongoose.Types.ObjectId();
    return (await new model(blog).save()).toObject(); 
}