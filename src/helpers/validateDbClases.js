const userModel = require("../models/clases");

const validaId  = async (id)=>{
    const isExists = await userModel.findById({_id:id})

    if(!isExists){
        throw new Error(`El id: ${id} no existe`)
    }
   return 
}

const validaHora = async (id) => {
  const fecha = new Date();
  const hora = fecha.getHours();

  const clases = await userModel.findById({ _id: id });

  const inicio = clases.inicio;

  console.log("inicio ", inicio, "hora ", hora);

  if (inicio <= hora) {
    
    throw new Error("No se puede reservar la clase en este horario");
  }

  return;
};



module.exports = { validaHora,validaId };
