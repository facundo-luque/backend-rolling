
const {Schema, model} = require("mongoose")

const userSchema = Schema({
    fname_lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    telefono:{
        type: Number,
    },
    planContratado:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "USER"
    },
    status:{
        type: Boolean,
        default: true
    },
    cpassword:{
        type: String,
        required: true
    }

})

module.exports=  model("user", userSchema)