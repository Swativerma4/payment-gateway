const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true 
    },
    Phone:{
        type:Number,
        required:true 
    },
    fatherName:{
        type:String,
        required:true 
    },
    City:{
        type:String,
        required:true 
    },
    Qualification:{
        type:String,
        required:true
    },
    PinCode:{
       type:Number,
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true 
    },
    Role:{
        type:String,
        required:true   
    },
    Payment:{
        type:Boolean,
        default:false
    }
})

const User=new mongoose.model('User',userSchema);

module.exports=User;