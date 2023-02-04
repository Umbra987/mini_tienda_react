import db from "../database/db.js";

//Sequelize es un ORM para Nodejs que nos permite manipular varias bases de datos SQL de una manera bastante sencilla.
import { DataTypes } from "sequelize";

//BlogModel es por asi decirlo el tipo de dato u/o objeto que vamos a recibir de la conexion
//Con la base de datos desde db donde lo unico que vamos a especificar es que tipo de datos es cada uno
//de los cuales queremos extraer de la base de datos
const BlogModel = db.define('almacen_productos',{
    id: { type: DataTypes.INTEGER,
        primaryKey: true},
    nombre: { type: DataTypes.STRING},
    valor: { type: DataTypes.INTEGER},
    description: { type: DataTypes.STRING},
    cantidad : { type: DataTypes.INTEGER },
    minimo : { type: DataTypes.INTEGER },
    stock : { type: DataTypes.INTEGER },
    maximo : { type: DataTypes.INTEGER },
    img1 : { type: DataTypes.STRING },
    img2 : { type: DataTypes.STRING },
    img3 : { type: DataTypes.STRING }
});

export default BlogModel;