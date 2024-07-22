
const userModel = require("../models/clases");

const crearClase = async (req, res) => {
    try {
      const { body } = req;

      const profMay = body.profesor.toUpperCase()
      const nomMin =   body.nombre.toLowerCase()

      body.profesor =profMay
      body.nombre =nomMin
        
      const clase = new userModel(body);
     
      
  
      await clase.save();
  
      
  
      res.statusCode = 201;
  
      res.json({
        message: "Clase creada con exito",
        result: clase.nombre
      });
    } catch (error) {
      res.statusCode = 500;
  
      res.json({
        message: "INTERNAL SERVER ERROR",
        error: error.message,
      });
    }
  };

  
const getClases = async (req, res) => {
  let query = null 
  const {pagina, role} = req.query 

  /* paginacion */
  console.log("la pagina es: ",pagina)
  const opciones = {
  page:pagina || 1 ,
  limit:6
 }

/* Si es usuario solo muestra clases disponibles */
    if (role === "USER"){
        query = { disponible: true }
     } 
   
 try {

  const clases = await userModel.paginate(query, opciones)

  const dataPaginate = {
    totalDocs:clases.totalDocs,
    page:clases.page,
    prevPage:clases.prevPage,
    nextPage:clases.nextPage,
    totalPages:clases.totalPages
}

console.log("paginacion ", dataPaginate)


res.json({
  message: "todas las clases",
  results: clases.docs,
  paginacion: dataPaginate
});

 } catch (error) {
  res.statusCode = 500;

  res.json({
    message: "INTERNAL SERVER ERROR",
    error: error.message,
  });
 }
   
  
};
  
const modificarCupo = async (req,res) =>{

try {
  const {id} = req.params

let  {cupos_disponibles,...restbody} = req.body

if ( restbody.profesor){
  const profMay = restbody.profesor.toUpperCase()
  restbody.profesor =profMay
}

if (restbody.nombre){
  const nomMin =   restbody.nombre.toLowerCase()
  restbody.nombre =nomMin
}

 if (cupos_disponibles || cupos_disponibles=== 0 ){
 
  nuevoCupo = await userModel.findByIdAndUpdate(id,{ cupos_disponibles:cupos_disponibles, ...restbody },{ new: true,})
}
 else  {
  nuevoCupo = await userModel.findByIdAndUpdate(id,{ ...restbody },{ new: true,})
}

res.json({
  message: "Clase modificada con exito",
  result: nuevoCupo,
});


} catch (error) {
  res.statusCode = 500;

    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
}
}

const deleteClase = async (req,res) =>{
 
  try {
    
    
    const {id} = req.params
    

    await userModel.deleteOne({_id:id})
    
    res.json({
      message: `clase eliminada con exito`
    
    });

  } catch (error) {
     res.statusCode = 500;

    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }

 
}
  module.exports = {crearClase,getClases,modificarCupo,deleteClase}