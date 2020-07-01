const express = require('express');
const router = express.Router();

// importing handler
const adminHandler = require('../handler/adminHandler');
const adminBlogHandler = require('../handler/adminBlogHandler');
const passport = require('passport');

// import middleware / auth
const auth = require('../../core/middleware/auth');

router.get('/get', adminHandler.getAdmin);
router.post('/add', adminHandler.addAdmin);
router.post('/login', adminHandler.loginAdmin);
router.post('/log', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (info) {
            req.data = info
            next()
        } else {
            req.data = null
            req.status = 403
            return next(new Error('Unauthorized'));
        }
    })(req, res, next);
});
router.get('/profile', auth, adminHandler.profile)
router.post('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        console.log('1')
        res.send(req.user.profile);
    }
);
router.get('/getBlog', adminBlogHandler.getBlog);
router.post('/addBlog', adminBlogHandler.addBlog);
router.post('/updateBlog', adminBlogHandler.updateBlog);
router.get('/deleteBlog', adminBlogHandler.deleteBlog);

module.exports = router;