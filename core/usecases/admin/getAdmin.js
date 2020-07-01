// import model
const model = require('../../modal/admin');
const mongoose = require("mongoose");

// show user
module.exports = async (filter) => {
    return await model.find(filter).exec()
}