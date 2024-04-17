const {Router} =  require("express")
const {check} = require("express-validator")

const {validaId} = require("../helpers/ValidateClasesUsuarios")
const {creaClaseUsuario,getClasesUsuario,eliminarClasesUsuario} = require("../controllers/clases_usuarios")
const {validateField} = require("../helpers/validateFields")

const router = Router()
router.post("/",creaClaseUsuario)

router.get("/",getClasesUsuario)

router.delete("/:id",
[
    check("id", "El id ingresado no es correcto").isMongoId(),
    check("id").custom(validaId),
    validateField
],
eliminarClasesUsuario)


module.exports = router;