import axios from 'axios'
import { useState , useEffect } from 'react'
import { useNavigate} from 'react-router-dom'



const URL = "https://ecommerce-p3mq.onrender.com/products/";

const ShowProducts = ({allProducts,setAllProducts,countProducts,setCountProducts,total,setTotal,user}) =>{


    const restProduct = async (body) => {
        const get = await axios.post(URL, body)
        console.log(get);
    }

    const changeRegistered = async (product) => {
        const body = 
        {
            id : product.id,//Id del producto
            nombre : product.nombre,//Nombre del producto
            valor : product.valor,//Valor del producto
            cantidad : product.cantidad,//Cantidad del producto
            description : product.description,//Description del producto
            minimo : product.minimo,//stock minimo
            stock : product.stock - product.cantidad,//stock menos la cantidad del producto
            maximo : product.maximo//stock maximo
        }
        restProduct(body);
    }

    const navigate = useNavigate();
    /* Lo que hace esta funcion es que en base al producto que le entregamos al darle al boton de añadir al carrito
    primero verifica si en el carrito ya hay mas de ese producto con el mismo id ,si hay entonces suma a cantidad y no agrega uno nuevo producto
    al carrito,si no hay en el carrito de ese producto entonces añade uno nuevo al carrito. */
     const onAddProduct = (product) =>{
        if(user !== '' && product.stock > 0){
        if(allProducts.find(item => item.id === product.id)){
            //Si ya hay producto con el mismo id suma a cantidad,sino lo agrega
            alert("El producto ya esta en el carrtio...");
            const products = allProducts.map(item => item.id === product.id ? {...item} 
                : item
            );
            return setAllProducts([...products]);
        }
        //De igual manera se hace lo mismo cuando es un producto con id nuevo al carrito
        setTotal(total + product.valor * product.cantidad);
		setCountProducts(countProducts + product.cantidad);
        setAllProducts([...allProducts,product]);
        changeRegistered(product);
        }
        else navigate('/login');
    }


    //Mostrar todos los productos
    //Los productos los conseguimos usando axios.get(URL) que junto con express se conectan a la base de datos
    //obtienen todos los productos y con la funcion setProdcuts llenamos a products
    const getProducts = async () =>{
        const resultados = await axios.get(URL);
        setProduct(resultados.data);
    }

    //Lo que hacemos es llenar a products con todos los objetos que hayan en la base datos
    const[products,setProduct] = useState([])
    useEffect ( ()=>{
        getProducts();
    },[]);

    console.log(products);
    return(//Luego retornamos una estructura html
        <div className='container' > {products && products.map( (product) =>(//La funcion map lo que hace es recorrer a products como un arreglo y por cada posicion se realiza 
                                    //un bloque de codigo html con los datos del producto en la posicion que se encuentre map
            <div className='container_product' key={product.id}>
                <div className='img_product'>
                    <ul>
                        <li><img src={product.img1} alt="" /></li>
                        <li><img src={product.img2} alt="" /></li>
                        <li><img src={product.img3} alt="" /></li>
                    </ul>
                </div>
                <div className='Title_product'> { product.nombre } </div>
                <div className='Value_Product'>Precio: {Intl.NumberFormat().format(product.valor) } COP<br></br></div>
                <div className='Description_product'><b>Description:</b><br></br>{ product.description } </div>
                <button onClick={() => onAddProduct(product)} className='BtnaddCarrito'>Añadir al carrito</button>
            </div> ))//Asignamos como las respectivas imagenes relacionandolas con el id,asi como es el nombre,valor y descripcion del articulo,ademas añadiendo a cada articulo su boton de añadir al carrito
             }
        </div>   
    );

}

//Exportamos ShowProducts para luego usarlo en otro lugar que sea necesario.
export default ShowProducts;