//import mongoose from "mongoose";
const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require("mongoose-findorcreate");


const devuser=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    
        trim:true,
        min:6
    },



    
    
})
//for using this schema another file we have export
//first devuser is model name or collection name or table name in sql


devuser.plugin(passportLocalMongoose);
devuser.plugin(findOrCreate);

module.exports=mongoose.model('devuser',devuser)

