
const mongoose = require("mongoose")
const dbConection = async () => {
 
    try {
     await   mongoose.connect(process.env.CONECTDB ) 
     
     console.log("Base de datos conectada")
    } catch (error) {

        console.log(error)

        throw new Error ("Error en la conexion de la base de datos")
        
    }


}

module.exports = {
    dbConection
}