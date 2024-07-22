const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

const {generateJSW} = require("../helpers/generatorJWT")



const login = async (req,res) =>{

const {email,password} = req.body

try {
    const userLogin = await userModel.findOne({email})

if (!userLogin){
    return res.status(404).json({
        message: "Email or password incorrect"
    })
}

if (!userLogin.isActive) {
    return res.status(400).json({
        message:"User inactive"
    })
}

const validPassword =  bcrypt.compareSync(password, userLogin.password)

if (!validPassword) {
    return res.status(400).json({
        message:"Email or pass incorrecta"
    })
}

res.json({
    message:"user login succsess"
    
})

//crear token

const token = await generateJSW(userLogin.id)

//enviar token

res.json({
    message:"user login succsess",
    token
})

} catch (error) {
    console.error(error)
    res.status(500).json({
        message:"Contact suport"
    })
    
}



}


const validaLogin = async (req, res) => {
  const { email, password } = req.query;
  console.log(`-----------El email es ${email} las pass es ${password}----`)
  try {
  


    const userLogin = await userModel.findOne({ email });

    console.log("el user login es: ", userLogin);

     const validPassword = bcrypt.compareSync(password ,userLogin.password  );

  

     if (!validPassword) {
    return res.status(400).json({
        message:"Credenciales incorrectas"
    })
    }

   
    //crear token

    const token = await generateJSW(userLogin._id)
    console.log("el token es: ", token)

    res.json({
      message: "Login",
      results: userLogin,
      token: token
    });
  } catch (error) {
    res.json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
};
module.exports = {
  login,
  validaLogin,
};
