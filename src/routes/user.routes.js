const {Router} =  require("express")
const {check} = require("express-validator")

const {getUsuario,postUsuario,puttUsuario,deleteUsuario} = require("../controllers/user_controller")
const {validateField} = require("../helpers/validateFields")
const {emailExists,validaAdmin,eliminaUsuario} = require("../helpers/dbValidatos")
const { validateJWT } = require("../middlewares/validateJWT")
const { isAdmin } = require("../middlewares/validateRole")

const router = Router()

router.get("/",
[
    validateJWT ,
    isAdmin,
    validateField,
]
,getUsuario )




router.post("/",
[
    check("fname_lname","Debe ingresar su nombre").notEmpty(),
    check("password","debe ingresar una contraseña").notEmpty(),
    check("password","La contraseña debe contener por lo menos 6 caracteres").isLength({min:6}),
    check("cpassword","debe repetir la contraseña").notEmpty(),
    check("email", "debe ingresar su correo").notEmpty(),
    check("email","El correo ingresado no es valido").isEmail(),
    check("email").custom(emailExists),
    validateField,
],
 postUsuario)


router.put ("/:id",
[   check("id","El id no puede ser nulo").notEmpty(),
    check("id","El id no es correcto").isMongoId(),
    check("fname_lname","Debe ingresar su nombre").notEmpty(),
   // check("id").custom(validaAdmin),
    validateField
]
,puttUsuario)


router.delete ("/:id", 
[
    check("id","El id no es correcto").isMongoId(),
    check("id").custom(eliminaUsuario),
    validateField
]
,deleteUsuario)


module.exports = router;