// import model
const model = require('../../modal/adminBlog');

// delete admin blog
module.exports = async(blogId) => {
    let deleteResponse = await model.remove({"_id": blogId}).exec()
    console.log(blogId)
    if(deleteResponse.ok == 1){
        return {Message:"Blog Deleted"}
    }
    else {
        return {Error: 'Something went wrong!!'}
    }
}