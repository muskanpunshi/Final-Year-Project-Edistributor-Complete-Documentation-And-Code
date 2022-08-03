const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let riderSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    cnic:{type:Number,required:true},
    mobilenumber:{type:Number,required:true},
    password:{type:String,required:true},
    usertype:{type:String,default:'Rider'},
   
    

});

riderSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})
module.exports = mongoose.model('Rider', riderSchema);
