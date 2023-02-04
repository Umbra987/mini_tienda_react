import ModelUser from "../models/ModelUser.js";

//Extraemos de la base de datos todos los usuarios
export const getAllUsers = async (req,res) => {
    try{
        const users = await ModelUser.findAll()
        res.json(users);
    }catch(error) {
        res.json({message: error.message});
    }
 }

//Crear un nuevo usuario en base al model
 export const createUser= async (req,res) =>{
    console.log(req.body.email);
    try{
        await ModelUser.create(req.body);
        console.log("Usuario creado");
        
    }catch(error){
        res.json({message: error.message});
    }
 }


 //Actualizar un usuario segun el ModelUser y los nuevos parametros
 export const Updateuser = async (req,res) => {
    try{
        await ModelUser.update(
            {
                userName : req.body.userName,
                password : req.body.password,
                telefono : req.body.telefono,
                email : req.body.email
            },
            {
            where: {id: req.body.id}
            })
            console.log("admin actualizado");
    }catch(error) {
        res.json({message: error.message});
    }
 }