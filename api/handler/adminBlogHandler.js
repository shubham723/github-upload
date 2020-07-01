const adminblogcontroller = require('../../core/controller/adminBlogController');

getBlog = async (req,res,next) => {
    try{
        let blog = await adminblogcontroller.getBlog(req.body)
        req.data = blog
        next()
    }
    catch (e) {
        req.status = 400;
        next(e) 
    }
}

addBlog = async (req,res,next) => {
    try{
        let blog = await adminblogcontroller.addBlog(req.body)
        req.data = blog
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)  
    }
}

updateBlog = async (req,res,next) => {
    try{
        let blogRecords = await adminblogcontroller.updateBlog(req.body)
        req.body = blogRecords
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

deleteBlog = async (req,res,next) => {
    try{
        let blogRes = await adminblogcontroller.deleteBlog(req.data)
        console.log(req.data)
        if(blogRes.Error){
            req.status = 400;
            next(blogRes.Error) 
        }
        else {
            req.message = blogRes.Message;
            req.data = null;
            next()
        }
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

module.exports = {getBlog,addBlog,updateBlog,deleteBlog}