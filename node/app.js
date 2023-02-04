 import  express  from "express";
 import cors from 'cors'


 //Metodo de pago
 

 //Importacion de la conexion con la base de datos
 import db from "./database/db.js";
//Importacion de los routers
 import Routes_Almacen from "./routes/routes.js";
 import pay from "./routes/pay.cjs"



 //const stripe = require("stripe")("sk_test_51MX8LDAAbcGRHR0kQivZsgZ4aB6ZHsIvTBtwe2mbuBhyukkxF84JQEgo4e0qGz5kfK1KUPI8A99PD2A6sdofPL5A00UzzeF7zM");

 const app = express();
    //Cors es un medida de seguridad que asegura que todos los datos vienen del mismo lugar y no de directorios ajenos al ya establecido
    app.use(cors());
    app.use(express.json());
    app.use(pay);//router del metodo de pago
    //Definimos cual va a ser la ruta predeterminada y con routers vamos a estar en ella

    app.use('/',Routes_Almacen);
try{
    //Se espera a que se haga conexion con la base de datos,sino imprimimos el error en consola
    await db.authenticate();
    console.log("Conexion establecida a la base de datos");
    
}catch(error){
    //Impresion del error
    console.log(`El error de conexion es: ${error}`);
}


//Definimos el puerto en el que va a escuchar el servidor ,tanto el front como el back deben estar escuchando en el mismo puerto
 const puerto = 8000;

 app.listen(puerto,() => {
    console.log("El servidor esta escuchando en el puerto: " + puerto);
 });