import db from "../database/db.js";

//Sequelize es un ORM para Nodejs que nos permite manipular varias bases de datos SQL de una manera bastante sencilla.
import { DataTypes } from "sequelize";

//ModelUser es por asi decirlo el tipo de dato u/o objeto que vamos a recibir de la conexion
//Con la base de datos desde db donde lo unico que vamos a especificar es que tipo de datos es cada uno
//de los cuales queremos extraer de la base de datos
const ModelUser = db.define('client_accounts',{
    userName: { type: DataTypes.STRING },
    password : { type: DataTypes.STRING },
    telefono: { type: DataTypes.INTEGER},
    email: { type: DataTypes.STRING}
});

export default ModelUser;