const {Router} =  require("express")
const {check} = require("express-validator")
const {crearClase,getClases,modificarCupo,deleteClase} = require("../controllers/clases")
const {validaHora,validaCupos,validaId } = require("../helpers/validateDbClases")
const {validateField} = require("../helpers/validateFields")


const { isAdmin } = require("../middlewares/validateRole")


const router = Router()
router.post("/",crearClase)
router.get("/", getClases)
router.put("/:id",
[
 check("id","El id no es conrrecto").isMongoId(),
 check("id").custom(validaId),
 check("id").custom(validaCupos),

 validateField
],

modificarCupo)

router.delete("/:id",
[
    check("id","El id no puede ser nulo").notEmpty(),
    check("id", "El id no es valido").isMongoId(),
    validateField
],
deleteClase)

module.exports = router;