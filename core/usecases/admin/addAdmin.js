// import model
const model = require ('../../modal/admin');
const mongoose = require ("mongoose");

// get admin
const getAdmin = require('./getAdmin');

//add admin
module.exports = async(admin) => {
    admin._id = new mongoose.Types.ObjectId();
    let adminRecords = await getAdmin ({username:admin.username});
    if (adminRecords.length>0){
        throw new Error ("User already exist");
    }
    return (await new model(admin) .save()).toObject();
}