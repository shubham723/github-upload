// import model 
const model = require ('../../modal/blog');

// show blogs 
module.exports = async (filter) => {
    return await model.find(filter).exec()
}