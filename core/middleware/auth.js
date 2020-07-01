const jwt = require ('jsonwebtoken');

// auth
module.exports = (req,res,next) => {
    try {
        const token = req.query['x-access-token'] || req.headers ['x-access-token']
        if (!token) res.status(403).send({success:false,message:"no token given"})
        const decod = jwt.verify(token,"shubham");
        console.log('11')
        let adminData = {
            id:decod.id,
            username:decod.username
        }
        console.log(adminData)
        req.adminData = adminData;
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Auth failed',
            Error : error
        });
    }
};