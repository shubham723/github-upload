const addBlog = require('../usecases/admin/addBlog');
const getBlog = require('../usecases/admin/getBlog');
const updateBlog =require('../usecases/admin/updateBlog');

// get all blogs for admin
exports.getBlog = async(blogprops) => {
    let filter = {}
    if(blogprops.id) filter._id = blogprops.id;
    if(blogprops.title) filter.title = blogprops.title;
    if(blogprops.user_id) filter.user_id = blogprops.user_id;
    if(blogprops.description) filter.description = blogprops.description;
    if(blogprops.is_featured) filter.is_featured = blogprops.is_featured;
    if(blogprops.is_active) filter.is_active = blogprops.is_active;
    let blogRecords = await getBlog(filter);

    blogRecords = blogRecords.map(it=>{
        return{
            id:it._id,
            title:it.title,
            user_id:it.user_id,
            description:it.description,
            is_featured:it.is_featured,
            is_active:it.is_active
        }
    })
    return blogRecords;
}

// add new blog
exports.addBlog = async (blog) => {
    if(!blog.title) throw new error ('title is required');
    if(!blog.user_id) throw new error ('user_id is required');
    if(!blog.description) throw new error ('description is required');
    if(!blog.is_featured) throw new error ('is_featured required');
    if(!blog.is_active) throw new error ('is_active required')

    let newBlog = {
        title:blog.title,
        user_id:blog.user_id,
        description:blog.description,
        is_featured:blog.is_featured,
        is_active:blog.is_active
    }
    let savedblog = await addBlog(newBlog);
    return savedblog;
}

// update blog
exports.updateBlog = async(blogprops) => {
    let blogId = blogprops.id;
    if (!blogprops.id) throw new Error('Please provide id');
    let filter = {}

    if(blogprops.title) filter.title = blogprops.title;
    if(blogprops.user_id) filter.user_id = blogprops.user_id;
    if(blogprops.description) filter.description = blogprops.description;
    if(blogprops.is_featured) filter.is_featured = blogprops.is_featured;
    if(blogprops.is_active) filter.is_active = blogprops.is_active;

    let blogRecords = await updateBlog(blogId,filter);
    blogRecords = blogRecords.map(it=>{
        return{
            id:it._id,
            title:it.title,
            user_id:it.user_id,
            description:it.description,
            is_featured:it.is_featured,
            is_active:it.is_active
        }
    })
    return blogRecords;
}

exports.deleteBlog = async(blogId) => {
    if(!blogId) throw new Error('Please Provide Id');

    let blogResponse = await deleteBlog(blogId);
    return blogResponse;
}