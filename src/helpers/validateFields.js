const {validationResult} = require("express-validator")

const validateField = (req,res,next) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log("hubo un error en validate field")
        return res.status(400).json(errors)
    }

    next()

}

module.exports = {validateField}