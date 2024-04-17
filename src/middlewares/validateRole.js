

const isAdmin =(req,res,next)=> {
   const {role}= req.query

    if (role !== "ADMIN" &&
        role !== "SUPERADMIN" 
    ){
        return res.status(401).json({
            message: `El usuario no tiene rol de administrador`
        })
    }

    next()
}


module.exports = {isAdmin}