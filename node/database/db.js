import { Sequelize } from "sequelize"

//Lo que hacemos con db es que atravez de sequelize enlazamos con la base de datos MySQL entregandole 
//El nombre de la base de datos usuario contraseña el dialecto que se va a manejar el host y el puerto donde
//Se va a ejecutar esa base de datos

const db = new Sequelize('productosapp','umbra987','Manchitas9871',{
    host:'ricoshop.com.mialias.net',
    dialect: 'mysql'
});


export default db;