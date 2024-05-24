const {Schema, model} = require("mongoose")

const userSchema = Schema({
    
    id_clase:{
        type:String
    },
    
   
    nombre:{
        type: String,
        required: true
    },
    inicio:{
        type: Number,
        required: true
    },
    fin:{
        type: Number,
        required: true
    },
    profesor:{
        type: String,
        requerid: true
    },
    cupos_disponibles:{
        type: Number
    },
    cupos:{
        type:Number,
        requerid:true
    },
    disponible:{
        type: Boolean,
        default:true
    },
    usuario:{
        type:String
    }

})

module.exports=  model("clases_usuarios", userSchema)