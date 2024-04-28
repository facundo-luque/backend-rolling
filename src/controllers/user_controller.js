const bcrypt = require("bcryptjs");

const userModel = require("../models/user");



const getUsuario = async (req, res) => {

  const {pagina} = req.query 
  console.log("la pagina es: ",pagina)
 const opciones = {
  page:pagina ,
  limit:5 
 }

  
  const allUsers = await userModel.paginate({}, opciones)

  const dataPaginate = {
      totalDocs:allUsers.totalDocs,
      page:allUsers.page,
      prevPage:allUsers.prevPage,
      nextPage:allUsers.nextPage,
      totalPages:allUsers.totalPages
  }

  console.log("paginacion ", dataPaginate)

 
  res.json({
    message: "All Users",
    results: allUsers.docs,
    paginacion: dataPaginate
  });
};

const postUsuario = async (req, res) => {


  try {
    const { body } = req;

    delete body.cpassword

   

     if (body.planContratado) {
      const planMin = body.planContratado.toLowerCase()
      body.planContratado =planMin
     }
    const nombMay = body.fname_lname.toUpperCase()
    


    body.fname_lname =nombMay
   

    const user = new userModel(body);
    const salt = bcrypt.genSaltSync(10); // cantidad de veces que se encripta la pass

    const hash = bcrypt.hashSync(body.password, salt); // encripto la password enviada

    user.password = hash; // asigno la pass encriptada

    await user.save();

    const userMessage = {
      Nombre: user.fname_lname,
      email: user.email,
      uid: user.id,
    };

    res.statusCode = 201;

    res.json({
      message: "Usuario creado con exito",
      result: userMessage, //user
    });
  } catch (error) {
    res.statusCode = 500;

    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
};

const puttUsuario = async (req, res) => {

  try {
    
    const { id } = req.params;

    const { email, password, ...restBody } = req.body;
    let newUser = {}

   

    if (restBody.planContratado) {
     const planMin = restBody.planContratado.toLowerCase()
     restBody.planContratado =planMin
    }
   const nombMay = restBody.fname_lname.toUpperCase()
   


   restBody.fname_lname =nombMay
    
  
    if (password){
      const salt = bcrypt.genSaltSync(10); // cantidad de veces que se encripta la pass
  
      const hashPassword = bcrypt.hashSync(password, salt); // encripto la password enviada
  
       newUser = await userModel.findByIdAndUpdate(id, {password: hashPassword,...restBody}, { new: true,});
  
    } else {
      console.log("llegue hasta aqui en el put de usuarios")
       newUser = await userModel.findByIdAndUpdate(id, {...restBody}, {new: true,});
    }
  
    res.json({
      message: "User updated successfully",
      result: newUser,
    });
      
  } catch (error) {
    res.statusCode = 500;

    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
   
 
};


const deleteUsuario = async (req,res) =>{

  const {id} = req.params
  try {
    await userModel.deleteOne({_id:id})
    

    res.json({
      message: `Usuario eliminado con exito`
    
    });

  } catch (error) {
     res.statusCode = 500;

    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
}

/*
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

   
    const user = await userModel.findById(id);

    if (!user) {
        throw new Error (`The user with id ${id} not exists in db`)
    }

    if (!user.isActive) {
      throw new Error(`The user with id ${id} is not active`);
    }

    const deleteUser = await userModel.findByIdAndUpdate( id,{ isActive: false },{ new: true } );

    res.json({
      message: "User deleted successfully",
      result: deleteUser,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};*/

module.exports = {
  getUsuario,
  postUsuario,
  puttUsuario,
  deleteUsuario,

};
