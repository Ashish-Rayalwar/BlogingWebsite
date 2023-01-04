const jwt=require('jsonwebtoken')

const tokenVerify = function(req,res,next){
    let token = req.headers["x-api-key"];
  
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);

   let decodedToken = jwt.verify(token, "Bloging-site-is-very-secure");
   console.log(decodedToken)
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
    next()
}

module.exports={tokenVerify}



