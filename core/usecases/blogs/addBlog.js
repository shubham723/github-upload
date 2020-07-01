const model = require('../../modal/blog');
const mongoose = require('mongoose');

//add blog
module.exports = async (blog) => {
    blog._id = new mongoose.Types.ObjectId();
    return (await new model(blog) .save()).toObject();
}