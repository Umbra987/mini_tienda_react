import BlogModel from '../models/BlogModel.js';

//De acuerdo a BlogModel es mas facil acceder a los registros de la base de datos y de la misma froma se facilita
//La creacion de controladores que devuelvas archivos JSON respecto a lo que se solicite

//Mostrar todos los productos
 export const getAllProducts = async (req,res) => {
    try{
        const products  = await BlogModel.findAll()
        res.json(products);
    }catch(error) {
        res.json({message: error.message});
    }
 }

 //Mostrar solo un producto
 export const getProduct = async (req,res) => {
    try{
        const product  = await BlogModel.findAll({
            where: {id:req.params.id}
        })
        res.json(product[0]);
    }catch(error) {
        res.json({message: error.message});
    }
 }

 //Actualizar un producto
 export const UpdateProduct = async (req,res) => {
    try{
        await BlogModel.update(
            {
                nombre : req.body.nombre,
                valor : req.body.valor,
                description : req.body.description,
                cantidad : req.body.cantidad,
                minimo : req.body.minimo,
                stock : req.body.stock,
                maximo : req.body.maximo
            },
            {
            where: {id: req.body.id}
            })
        console.log("producto actualizado");
    }catch(error) {
        res.json({message: error.message});
    }
 }


 //Crear un producto

 export const createProduct = async (req,res) =>{
    try{
        await BlogModel.create(req.body)
        console.log("Producto creado");
    }catch(error){
        res.json({message: error.message});
    }

 }