const multer = require("multer");
const pic = multer.diskStorage({
    destination: function (req,file,cb){
        cb (null,'./uploads');
    },
    filename: function(req,file,cb) {
        cb (null, file.originalname);
    }
});
var upload = multer ({storage:pic})
const express = require ('express');
const router = express.Router();

// get handler
const blogHandler = require('../handler/blogHandler');


// import middleware / auth
const auth = require('../../core/middleware/auth');

router.get ("/get",blogHandler.getblog);
router.post ("/add",upload.single('pic'),blogHandler.addBlog);
router.get ("/get/:id",blogHandler.getblogbyid);
router.patch("/update/:id",blogHandler.updateBlog);
router.delete("/delete/:id",blogHandler.deleteBlog);
router.get ("/search",blogHandler.getBlogbyparams);
router.get ("/pagination",blogHandler.pagination);

module.exports = router;