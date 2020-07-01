const model = require ('../../modal/contact');
const mongoose = require ('mongoose');

// Add Contact Details
module.exports = async (contact) => {
    contact._id = new mongoose.Types.ObjectId();
    return (await new model(contact) .save()).toObject();
}