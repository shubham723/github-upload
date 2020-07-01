const adminController = require ('../../core/controller/adminController');
const auth = require('../../core/middleware/passport');

getAdmin = async (req,res,next) => {
    try {
        let admin = await adminController.getAdmin(req.body)
        req.data = admin
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

addAdmin = async (req,res,next) => {
    try {
        let admin = await adminController.addAdmin(req.body)
        req.data = admin
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}

loginAdmin = async (req,res,next) => {
    console.log(req.data)
    if (!req.body.username) return next (new Error("Enter username"))
    if (!req.body.password) return next (new Error("Enter Password"))
    let filter =  {username:req.body.username,password:req.body.password};
    try {
        let admin = await adminController.loginAdmin(filter)
        if(admin.Error){
            req.data = null;
            req.status = 403;
            return next (new Error(admin.Error));
        }
        req.data = admin
        next()
    }
    catch (e) {
        req.status =400;
        next(e)
    }
}

login = async (req,res,next) => {
    if (!req.body.username) return next (new Error("Enter username"))
    if (!req.body.password) return next (new Error("Enter Password"))
    let filter =  {username:req.body.username, password:req.body.password};
    try {
        let admin = await auth.passport(filter);
        console.log(admin)
        if(admin.Error){
            req.data = null;
            req.status = 403;
            return next (new Error(admin.Error));
        }
        req.data = admin
        next()
    }
    catch (e) {
        req.status =400;
        next(e)
    }
}

profile = async(req,res,next) => {
    let filter = {id:req.adminData.id}
    try{
        let admin = await adminController.profile(filter)
        req.data = admin
        next()
    }
    catch (e) {
        req.status = 400;
        next(e)
    }
}



module.exports = {getAdmin,addAdmin,loginAdmin, login, profile}