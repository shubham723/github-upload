const blogController = require('../../core/controller/blogController');

getblog = async (req,res,next) => {
    try {
        let blog = await blogController.getblog(req.body)
        req.data = blog
        next()
    }
    catch (e) {
        req.status = 400;
        next (e)
    }
}

addBlog = async (req,res,next) => {
    try{
        let blog = await blogController.addBlog(req.file,req.body)
        req.data = blog
        next()
    }
    catch (e) {
        req.status = 400;
        next (e)
    }
}

getblogbyid = async (req,res,next) => {
    try{
        let blogbyid = await blogController.getblogbyid(req.params.id)
        req.data = blogbyid
        next()
    }
    catch (e) {
        req.status=400;
        next(e)
    }
}

updateBlog = async (req,res,next) => {
    try {
        let blog = await blogController.updateBlog(req.params.id,req.body)
        req.data = blog
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

deleteBlog = async (req,res,next) => {
    try {
        let blogRecords = await blogController.deleteBlog(req.params.id)
        if (blogRecords.Error){
            req.status = 400;
            next(blogRecords.Error)
        }
        else {
            req.message = blogRecords.Message;
            req.data = null;
            next()
        }
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

getBlogbyparams = async (req,res,next) => {
    //if (!req.body.title) return next (new Error("Enter Title"))
    try{
        let blogbyparams = await blogController.getblogbyparams(req.query.title,req.query.author)
        req.data = blogbyparams
        next()
    }
    catch(e) {
        req.status = 400;
        next(e)
    }
}

pagination = async (req,res,next) => {
    //if (!req.body.title) return next (new Error("Enter Title"))
    if (req.query.page == 0) return next (new Error("Enter Page No."))
    console.log(req.query.page)
    try{
        let pagination = await blogController.pagination(req.query.perPage,req.query.page)
        req.data = pagination
        next()
    }
    catch(e) {
        req.status = 400;
        next(e)
    }
}


module.exports = {getblog,addBlog,getblogbyid,updateBlog,deleteBlog,getBlogbyparams,pagination}