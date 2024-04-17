
const mongoose = require("mongoose")
const dbConection = async () => {
 
    try {
     await   mongoose.connect("mongodb+srv://facundoluquepro:dl17VKnDfwUeybA0@cluster0.nlub3kx.mongodb.net/Rolling_gim")
     
     console.log("Base de datos conectada")
    } catch (error) {

        console.log(error)

        throw new Error ("Error en la conexion de la base de datos")
        
    }


}

module.exports = {
    dbConection
}