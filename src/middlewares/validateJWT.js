const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const validateJWT = async (req,res,next) =>{
 

    const {token} = req.query
    

    if (!token){
        res.status(401).json({
            message:"Token is required"
        })
    }

    try {

        
      const {uid} =  jwt.verify(token, process.env.SECRET_KEY)

     
      const user = await userModel.findById({_id:uid})

     

      if(!user.status){
        return res.status(401).json({
            message:"User is not active"
        })
      }

    
        
      next()
    } catch (error) {
        
        console.error(error)
        res.status(401).json({
            message: "Token invalid"
        })
    } 

    
}

module.exports = {validateJWT}