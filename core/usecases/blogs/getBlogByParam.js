// import model
const model = require('../../modal/blog');

// get blog by id
module.exports = async(title,author) => {
   //  return await model.find({
   //      $and: [
   //         {"title": title}, {"author":author}
   //      ]
   //   }).exec();
   if(title){
      console.log('000000')
   return await model.find({"title":title}).exec();
   }
   // if(author){
   //    console.log('000000')
   // return await model.find({"author":author}).exec();
   // }
   return await model.find().exec()
}