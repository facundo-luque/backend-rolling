const userModel = require("../models/user")

const {ROLES} = require("../contants")

const emailExists = async (email) => {

    const isExists = await userModel.findOne({email})

    if (isExists){
        throw new Error(`the email ${email} is already in use`)
    }

   return 
}


const isRoleVlalid = (rol) =>{

    isRoleExists = ROLES.includes(rol)// bucle que devuelve true o false

    if (!isRoleExists){
        throw new Error(`The role ${rol} is not valid`)

    }

}

const validaAdmin = async (id) => {

   
    const usuario = await userModel.findById(id)
   

    if (usuario.role !== "ADMIN"){
        throw new Error(`El usuario ${usuario.fname_lname} no tiene el rol de administrador`)
    }
   return
}

const eliminaUsuario= async (id)=>{

    const usuario = await userModel.findById(id)

    if (usuario.role === "SUPERADMIN"){
        throw new Error(`El usuario ${usuario.fname_lname} no puede ser borrado`)
    }
    return 
}



module.exports = {emailExists, isRoleVlalid,validaAdmin,eliminaUsuario}