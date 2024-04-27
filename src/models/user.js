
const {Schema, model} = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

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
        
    }

})

userSchema.plugin(mongoosePaginate)
module.exports=  model("user", userSchema)