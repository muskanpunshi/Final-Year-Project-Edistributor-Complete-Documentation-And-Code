const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    //cartId: {type: Schema.Types.ObjectId,ref:'Cart'},
    //cartId:[{type:Schema.Types.ObjectId,ref:'Cart'}],
    cartId:[{
        id:{type:String}
    }],
    // cartId:[{
    //     type:Number,
    // }],
    floor:{type:String},
    street:{type:String},
    city:{type:String},
    note:{type:String},
    totalprice:{type:String},
    status:{type:String,default:"InProcess"},


}); 


module.exports = mongoose.model('Order', orderSchema);
