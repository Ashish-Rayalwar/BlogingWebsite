const authorController = require("../cotroller/authorController.js")
const blogsController = require("../cotroller/blogsController.js")
const express = require("express")
const login=require('../cotroller/login')
const middleware=require('../Middleware/middleware')

const router = express.Router()


router.post("/authors", authorController.create)
router.post("/blogs", blogsController.createBlog)
router.get("/blogs",middleware.tokenVerify, blogsController.getBlogs)
router.put("/blogs/:blogId", blogsController.updateBlog)
router.delete("/blogs/:blogId", blogsController.deleteBlog)
router.delete("/blogs", blogsController.deleteByQuery)
router.post('/login',login.loginUser)


router.all("/*", (req,res)=>{
    res.status(400).send("plz send correct url")
})



module.exports=router