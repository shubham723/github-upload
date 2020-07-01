// import model 
const model = require ('../../modal/blog');

const mongoose = require('mongoose');

// show blogs 
module.exports = async (perPage,page) => { 
   /* var perPage = 5,
    page = Math.max(0, page)*/
    var perPage = 4;
    var page = Math.max(0, page) 
    console.log(typeof page)
    return await model.find({}).skip((page-1) * perPage).limit(perPage).exec()
}