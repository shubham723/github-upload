const model = require('../../modal/blog');

module.exports = async (blogId) => {
    let deleteBlog = await model.deleteOne({"_id":blogId}).exec()
    if (deleteBlog.ok == 1){
        return {Message:"blog deleted"}
    }
    else {
        return {Error: "Not Deleted"}
    }
}