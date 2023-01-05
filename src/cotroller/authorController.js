const authorModel = require("../models/authorModel");
// const { validateNameLastName, validateEmail, validateTitle } = require("../validators/validators");
 

const create = async (req,res)=>{
   try {
       
    const body = req.body
       
    if(Object.keys(body).length==0) return res.status(400).send("body is empty")

    let validate = /^([a-z                A-Z ]){2,30}$/
    
    let validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    let validatePassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    
    const {fname,lname,title,email,password} = body

    let arr = ["Mr","Mrs","Miss"]

    if(!validate.test(fname)) return res.status(400).send("plz provide valid First Name")
    
    const checkEmail = await authorModel.findOne({email:email})

    if(checkEmail) return res.status(409).send({msg:"This email is already exist, plz enter different email"})
    
    
    if(!validate.test(lname)) return res.send({msg:"plz provide valid Last Name"})
    
    if(!arr.includes(title)) return res.status(400).send({msg:"plz provide valid title"})

    if(!validateEmail.test(email)) return res.send({msg:"plz provide valid Email"})

    if(!validatePassword.test(password)) return res.send("plz provide valid password, use alphabates,number, special char like @ $ ")

    const createAuthor = await authorModel.create(body)

    res.status(201).send(createAuthor)

} catch (error) {
    res.status(500).send({error:error.message})
    console.log("Error while Create",error.message);
   }

}
  



    
    
   






module.exports = {
    create
}