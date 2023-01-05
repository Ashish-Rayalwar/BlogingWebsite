const authorController = require("../cotroller/authorController.js")
const blogsController = require("../cotroller/blogsController.js")
const express = require("express")
const  loginUser  = require("../cotroller/login.js")
const middleware = require("../middleware/middleware")

const router = express.Router()


router.post("/authors", authorController.create)
router.post("/blogs", middleware.tokenVerify, blogsController.createBlog)
router.get("/blogs", middleware.tokenVerify, blogsController.getBlogs)
router.put("/blogs/:blogId",  middleware.tokenVerify, middleware.userVerify, blogsController.updateBlog)
router.delete("/blogs/:blogId",middleware.tokenVerify, middleware.userVerify, blogsController.deleteBlog)
router.delete("/blogs", middleware.tokenVerify, blogsController.deleteByQuery)
router.post('/login',  loginUser.loginUser)

router.all("/*", (req,res)=>{
    res.status(400).send({msg:"plz send correct url"})
})



module.exports=router