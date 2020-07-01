// import model
const model = require('../../modal/contact');
const mongoose = require('mongoose');

// get contact details
module.exports = async () => {
    //console.log(userid)
    return await model.find().populate("userid").populate("blogid").exec()
    
}