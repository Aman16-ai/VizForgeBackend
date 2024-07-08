const User = require("../../model/User/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const ErrorProvider = require("../../Error/ErrorProvider");
const JWT_SECERT = "AMAN$44"
const register = async(req,res,next) => {

    try {   
        const existsuser = await User.find({$or:[{email:req.body.email},{username:req.body.username}]})
        console.log(existsuser)
        if(existsuser.length !== 0) {
            throw new ErrorProvider(400,false,'User already exsits')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password,salt)

        const user = await User.create({
            ...req.body,
            password:hashedpassword
        })

        const data = {
            user : {
                id : user.id
            }
        }
    const authtoken = jwt.sign(data,JWT_SECERT);
      console.log(authtoken);
      //sending the authtoken as a response
    
      return res.status(200).json({status:true,Response:{token:authtoken}})
    }
    catch(err) {
        next(err)
    }

   
}


const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username : req.body.username})

        console.log(user)
        if(user === null || user === undefined) {
            throw new ErrorProvider(400,false,"User not found")
        }
        let comparedPassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparedPassword) {
            throw new ErrorProvider(400,false,'Wrong crenditals')
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECERT);
        success = true;
        return res.status(200).json({status:true,Response:{token:authtoken}})
    }
    catch(err) {
        next(err)
    }
}

module.exports = {register,login}