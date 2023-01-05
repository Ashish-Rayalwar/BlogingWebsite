const { log } = require("console");
const jwt = require("jsonwebtoken");
const blogsModel = require("../models/blogsModel");


const tokenVerify = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
   
    if (!token) return res.status(400).send({ status: false, msg: "token is mandatory" }); 
     
   
    jwt.verify(token, "Bloging-site-is-very-secure",function (err,decodeToken){
        if(err) return res.status(401).send({msg:"Invalid Token"})
        req.decodeToken=decodeToken
        next();
    })
   
    

  } catch (error) {
    res.status(500).send(error.message);
  }
};





const userVerify = async (req,res,next) => {
   try {
    let blogId = req.params.blogId
   
    if(!blogId) return res.status(400).send({msg:"BlogId Id is Not present"})

    let token = req.headers["x-api-key"];
   
    let validateObjectId = /^[a-f\d]{24}$/i
   
    if(!validateObjectId.test(blogId)) return res.status(400).send("invalid blog id")
    
    let decodedToken = jwt.verify(token, "Bloging-site-is-very-secure",);

    let id  = decodedToken.Id

    let findAuthor = await blogsModel.findOne({_id:blogId})
     
    if(!findAuthor) return res.send("invalid blog id")

    let authorId = findAuthor.authorId

    if(id!=authorId) return res.status(404).send("user not found")

    next()
   } catch (error) {
    res.status(500).send(error.message)
   }

}
// const userQueryVerify = async (req,res,next) => {
    
//     let data = req.query
//     console.log(data)
//     let token = req.headers["x-api-key"];

//     let decodedToken = jwt.verify(token, "Bloging-site-is-very-secure");

//     let id  = decodedToken.Id

//     req.authorId=id

//     let findAuthor = await blogsModel.findOne(data)
    
//     if(!findAuthor) return res.status(400).send({msg:"invalid Input/id, plz enter valid Input"})

//     let authId = findAuthor.authorId.toString()

//     if(id!=authId) return res.status(404).send("Invalid token")

//     next()

// }


module.exports = { tokenVerify,userVerify };
