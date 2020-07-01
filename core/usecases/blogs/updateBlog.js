const model = require('../../modal/blog');
const getBlog = require('./getblog');

module.exports = async(blogId, blog) => {
    let blogUpdate = await model.updateOne({"_id": blogId}, {$set: blog}).exec()
    if (blogUpdate.ok == 1){
        return await getBlog({_id:blogId});
    }
    else {
        return {Error :'Not updated'}
    }
}