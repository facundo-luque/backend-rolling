const {Router} = require("express")
const {check} = require("express-validator")

const {validateField} = require("../helpers/validateFields")



const {validaLogin} = require("../controllers/auth_controller")



const router = Router()

console.log("llegue al auth router")

router.get("/login",
/*[
    check("email","Email is not valid").isEmail(),
    check("password","Password is requerid").notEmpty(),
    validateField
]
,*/validaLogin)

module.exports = router