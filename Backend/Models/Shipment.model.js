const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let shipmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    floor:{type:String,required:true},
   street:{type:String,required:true},
   city:{type:String,required:true},
   note:{type:String,required:true},
  
 
});

 
module.exports = mongoose.model('shipment', shipmentSchema);