const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const pic = new Schema ({
    pic:{type:String},
})

module.exports = mongoose.model("Pic",pic);