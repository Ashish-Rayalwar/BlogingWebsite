const { default: mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema({
    fname : {
        type:String,
        required:true,
        
        trim:true,
        lowercase:true
        
    },
    lname:{
        type:String,
        required:true,
       
        trim:true,
        lowercase:true
    },

    title : {
        type:String,
        required:true,
        enum : ["Mr","Mrs","Miss"],
        trim:true   
    },

    email : {
        type : String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
       
    },
    password : {
        type : String,
        required:true,
        trim:true
       
    }
})


module.exports = mongoose.model("Authors", authorSchema)