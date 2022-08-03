const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true},
    usertype:{type:String,default:'user'}

});

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    if(this.isModified('confirmpassword')){
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,12);
    }
    next();
})

module.exports = mongoose.model('User', userSchema);
