// import model
const model = require('../../modal/blog');
const mongoose = require('mongoose');

// get blog by id
module.exports = async(blogId) => {
    return await model.findOne({"_id":blogId}).exec();
}