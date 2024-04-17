const express = require("express")
const morgan = require("morgan");
const cors = require("cors")
const bodyParser = require('body-parser')

const {dbConection} = require("../database/connectDb")

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.usersPath = "/api/user/";
        this.authPath = "/api/auth/";
        this.clasesPath = "/api/clases/";
        this.clases_usuariosPath = "/api/clases_usuarios/";

        this.conection();

        this.middlewares();

        this.routes();
        
    }

    async conection (){
      await  dbConection()
    } ;

    middlewares(){
        this.app.use(express.json());
       //this.app.use(express.urlencoded({extended:true}))
        this.app.use(morgan("tiny"))
        this.app.use(cors())
       // this.app.use(bodyParser.urlencoded({extended: true}));
    }

    routes(){
        this.app.use(this.usersPath, require("../routes/user.routes"))
        this.app.use(this.authPath, require("../routes/auth.routes"))
        this.app.use(this.clasesPath, require("../routes/clases.routes"))
        this.app.use(this.clases_usuariosPath, require("../routes/clases_usuarios.routes"))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server online started in  https://localhost:${this.port}`)
        })
    }

}

module.exports =  Server;
