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


const validaCupos = async (id)=>{
    
    const clases = await userModel.findById(id)
    const cupos = clases.cupos
    const cupos_disponibles= clases.cupos_disponibles

    if (cupos_disponibles > cupos){
        throw new Error("La cantidad de cupos disponibles no puede ser mayor a la cantidad de cupos otorgados");
    }
    return
}
module.exports = { validaHora,validaCupos,validaId };
