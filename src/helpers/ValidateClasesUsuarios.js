const userModel = require("../models/clases_usuarios")

const validaId = async(id) =>{

    const isExists = userModel.findById({_id:id})
    if (!isExists){
        throw new Error(`El id ${id} no existe`)

    }
    return

}

module.exports= {validaId}