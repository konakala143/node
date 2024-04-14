const mongoose=require('mongoose');

const review=new mongoose.Schema({
    
    taskprovider:{
        type:String,
        required:true,
    },
    taskworker:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    
})
//for using this schema another file we have export
//first devuser is model name or collection name or table name in sql
module.exports=mongoose.model('review',review)