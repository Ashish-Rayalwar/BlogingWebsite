const { log } = require('console');
const jwt=require('jsonwebtoken');
const authorModel = require('../models/authorModel');

const loginUser = async function (req, res) {
    let body=req.body;
    let email = req.body.email;
    let password = req.body.password;
    if(Object.keys(body).length===0) return res.status(400).send("please provide email and password")
    if(!email) return res.send("plz provide email")
    if(!password) return res.send("plz provide password")

    let validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    let validatePassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

    if(!validateEmail.test(email)) return res.status(400).send("Invalid email, please provide valid email")

    if(!validatePassword.test(password)) return res.status(400).send("Invalid password, please enter valid password")
  
    let user = await authorModel.findOne({ email:email, password:password });
    if (!user)
      return res.status(404).send("user not found")

      let token = jwt.sign(
        {
          Id:user._id.toString(),
          project: "BlogingWebsite"
        },
        "Bloging-site-is-very-secure"
      );
    
      res.setHeader("x-api-key", token);
      res.status(200).send({token:token,message:"login success" });
    };

    module.exports={loginUser}
