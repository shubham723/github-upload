const getblog = require('../usecases/blogs/getblog');
const addBlog = require('../usecases/blogs/addBlog');
const getblogbyid = require('../usecases/blogs/getBlogById');
const updateBlog = require('../usecases/blogs/updateBlog');
const deleteBlog = require ('../usecases/blogs/deleteBlog');
const getblogbyparams = require('../usecases/blogs/getBlogByParam');
const pagination = require('../usecases/blogs/pagination');

var moment = require('moment');

// get blog
exports.getblog =  async(blogprops) => {
    let filter ={};
    if(blogprops.id) filter._id = blogprops.id;   
    if(blogprops.title) filter.title = blogprops.title;
    if(blogprops.short_desc) filter.short_desc = blogprops.short_desc;
    if(blogprops.author) filter.author = blogprops.author;
    let blogrecords = await getblog(filter);

    blogrecords = blogrecords.map(it=>{
        return {
            id: it._id,
            title:it.title,
            short_desc:it.short_desc,
            author:it.author,
            pic:it.pic
        }
    })
    return blogrecords;
}

// add blog
exports.addBlog = async(blogpic,blog) => {
    if (!blog.title) throw new Error ('Title is required');
    if (!blog.short_desc) throw new Error ('short_desc is required');
    if (!blog.author) throw new Error ('author is required');
    let pic2 = [];
    let pic = "";
    if (blogpic)pic = "http://localhost:3000/"+blogpic.path;
    
   //console.log(blogpic.length)
    
    let newBlog = {
        title:blog.title,
        short_desc:blog.short_desc,
        author:blog.author,
        pic:pic,
        dob:moment(blog.dob).format('ll')
    }
    //console.log(pic)
    let savedBlog = await addBlog(newBlog);
    return savedBlog;
}

// get blog by id
exports.getblogbyid = async (blogId) => {
    if(!blogId) throw new Error ("Provide ID");
    let blogData = await getblogbyid(blogId); 
        return {
            id: blogData._id,
            title:blogData.title,
            short_desc:blogData.short_desc,
            author:blogData.author,
            dob:moment(blogData.dob).format('ll')
        }
}

// update blog
exports.updateBlog = async(blogId,blog) => {
    if (!blogId) throw new Error ("Please provide Id")
    let blogRecord = await updateBlog(blogId,blog);

        return {
            title:blogRecord[0].title,
            short_desc:blogRecord[0].short_desc,
            author:blogRecord[0].author
        }
}

// delete blog
exports.deleteBlog = async(blogId) => {
    if (!blogId) throw new Error ("Please provide Id")

    let blogRecord  = await deleteBlog(blogId);
    return blogRecord
}

// get blog by param
exports.getblogbyparams = async(title,author) => {
    // if (!title) throw new Error ("Please Provide Title")
    
    // if (!author) throw new Error ("Please Provide Author")
    /*if(title) {
        var title = req.query.tite
    }*/
    let blogData = await getblogbyparams(title,author)

    blogData = blogData.map(it=>{
        return {
            id: it._id,
            title:it.title,
            short_desc:it.short_desc,
            author:it.author
        }
    })
    return blogData;
}

// pagination
exports.pagination = async (perPage,page) => {
    /*const start = (page - 1) * limit
    const end = page * limit
    var begin = (page-1) * perPage;
    var end = begin + perPage;*/
    console.log(page)
    let blogrecords = await pagination(perPage,page);
    blogrecords = blogrecords.map(it => {
        return {
            id: it._id,
            title:it.title,
            short_desc:it.short_desc,
            author:it.author,
            page: Math.ceil(page)
        }
    }) 
    //blogrecords = blogrecords.slice(begin, end);
    return blogrecords;
}