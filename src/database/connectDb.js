
const mongoose = require("mongoose")
const dbConection = async () => {
 
    try {
     await   mongoose.connect("mongodb://localhost:27017/Rolling_gim")
     
     console.log("Base de datos conectada")
    } catch (error) {

        console.log(error)

        throw new Error ("Error en la conexion de la base de datos")
        
    }


}

module.exports = {
    dbConection
}