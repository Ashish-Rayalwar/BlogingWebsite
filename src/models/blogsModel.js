const moment = require("moment/moment");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
// const date = moment().toDate()

const blogSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:true
    },

    authorId : {
        type:ObjectId,
        ref : "Authors",
        required:true
    },

    tags : {
        type : Array,
        tags : []
       
    },

    category : {
        type:String,
        required:true
    },

    subcategory:{
        type:Array,
        tags:[]
    },

    isDeleted:{
        type:Boolean,
        default:false

    },

    deletedAt:{
        type:Date
        
    },

    publishedAt:{
        type:Date
        
        
    },

    isPublished:{
        type:Boolean,
        default:false
        
    }



}, {timestamps:true})


module.exports = mongoose.model("Blogs", blogSchema)