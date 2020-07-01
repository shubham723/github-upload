const model = require('../../modal/pic');
const mongoose = require('mongoose');

//add pic
module.exports = async (pic) => {
    pic._id = new mongoose.Types.ObjectId();
    return (await new model(pic) .save()).toObject();
}