const jwt = require("jsonwebtoken")



const generateJSW = (uid) =>{

   return new Promise((resolve, reject) => {
        const paylod = {uid}
    
        jwt.sign(paylod,process.env.SECRET_KEY ,{expiresIn:"4h"},
        (err,token)=>{
            if (err){
                reject(err)
    
            } else {
                resolve(token)
            }
        }
        )
    }) 

    
}

module.exports = {
    generateJSW
}