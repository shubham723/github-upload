const model = require('../../modal/adminBlog');
const mongoose = require('mongoose');

// get admin blogs
module.exports= async (filter) => {
    return await model.find(filter).exec()
}