const userModel = require("../models/clases_usuarios");

const creaClaseUsuario = async (req,res) =>{

    try {
        const { body } = req;
          
        
        const claseUsuario = new userModel(body);
        await claseUsuario.save();

        const usuario = {
            clase: claseUsuario.nombre,
            usuario: claseUsuario.usuario
        }
    
        res.statusCode = 201;
    
        res.json({
          message: "Clase-usuario creada con exito",
          result:usuario
        });
      } catch (error) {
        res.statusCode = 500;
        console.log(error.message)
    
        res.json({
          message: "INTERNAL SERVER ERROR",
          error: error.message,
        });
      }

}

const getClasesUsuario = async (req, res) => {

    const {usuario} = req.query
    console.log("desde aca <<<<<<<<<<<<<<<<>>>>>>>>>>>")
    console.log("El user clas es: ", usuario)
  
    const query = { disponible:true , usuario:usuario}
    
   const clasesUsuarios = await userModel.find(query)
    
    res.json({
      message: "Todas las clases usuarios",
      results: clasesUsuarios
    });
  };
    
const eliminarClasesUsuario =  async (req,res) =>{
 
  try {
    const {id} = req.params
 
  
   const eliminar =  await userModel.deleteOne({_id:id})
  
    res.json({
      message:"Reserva cancelada con exito"
    })
  } catch (error) {
    
    console.log(error.message)
  }
  
}

module.exports = {creaClaseUsuario,getClasesUsuario,eliminarClasesUsuario}
