const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let cartProductsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    productId: { type: Schema.Types.ObjectId },
    productname: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image:{type:String},
    date: { type: Date, default: Date.now },
 

}); 


module.exports = mongoose.model('Cart', cartProductsSchema);
