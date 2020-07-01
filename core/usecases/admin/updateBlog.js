// import model
const model = require('../../modal/adminBlog');
const getBlog = require('./getBlog');

// update blog
module.exports = async (blogId,blogprops) => {
    let blogResponse = await model.updateOne({_id:blogId}, {$set: blogprops}).exec()
    if(blogResponse.ok == 1) {
        return await getBlog({_id:blogId});
    }
    else {
        return {Error: 'Something Went Wrong!!!'}
    }
}