import axios from 'axios'
import { useState , useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import '../Styles/admin.css'


const URL = "https://ecommerce-p3mq.onrender.com/products/";

export const useAdmin = ({user,setUser}) =>{

    const navigate = useNavigate();

    const [nameProduct,setNameProduct] = useState('');
    const [valueProduct,setValueProduct] = useState('');
    const [quantityProduct,setQuantityProduct] = useState('');
    const [minProduct,setMinProduct] = useState('');
    const [stockProduct,setStockProduct] = useState('');
    const [maxProduct,setMaxProduct] = useState('');
    const [DesProduct,setDesProduct] = useState('');

    //Lo que hacemos es llenar a products con todos los objetos que hayan en la base datos
    const[products,setProduct] = useState([])
    useEffect ( ()=>{
        getProducts();
    },[]);

    //Mostrar todos los productos
    //Los productos los conseguimos usando axios.get(URL) que junto con express se conectan a la base de datos
    //obtienen todos los productos y con la funcion setProdcuts llenamos a products
    const getProducts = async () =>{
        const resultados = await axios.get(URL);
        setProduct(resultados.data);
    }

  
    //Actualizar la base de datos de lo productos
    const changeCamp = (body) => {
        const get = axios.post("https://ecommerce-p3mq.onrender.com/change", body)
        console.log(get);
    }

    //Cuando el admin desee cambiar uno de los productos ,lo hara de manera individual por producto
    //Preguntando con ternarios si hay o no un nuevo valor para la variable
    const changeRegistered = async (product) => {
        const body = 
        {
            id : product.id,
            nombre : nameProduct === "" ? product.nombre : nameProduct,//Si esta vacio el input del nombre se envia el valor que ya existia
            valor : valueProduct === "" ? product.valor : valueProduct,//Si esta vacio el input del valor se envia el valor que ya existia
            cantidad : quantityProduct === "" ? product.cantidad : quantityProduct,//Si esta vacio el input de la cantidad se envia el valor que ya existia
            description : DesProduct === "" ? product.description : DesProduct,//Si esta vacio el input de la descripcion se envia el valor que ya existia
            minimo : minProduct === "" ? product.minimo : minProduct,//Si esta vacio el input del stock minimo se envia el valor que ya existia
            stock : stockProduct === "" ? product.stock : stockProduct,//Si esta vacio el input del stock se envia el valor que ya existia
            maximo : maxProduct === "" ? product.maximo : maxProduct//Si esta vacio el input del stock maximo se envia el valor que ya existia
        }
        changeCamp(body);
       alert("registro actualizado"); 
    }

    

    const[userNameIn,setUserNameIn] = useState('');//Variable del nombre del usuario
    const[userPasswordIn,setUserPasswordIn] = useState('');//Variable del nombre de la contraseña
    const[userTelIn,setUserTelIn] = useState('');//Variable del nombre del telefono
    const[userEmailIn,setUserEmailIn] = useState('');//Variable del nombre del email

    const changeAdmin = async (body) => {
        const get = await axios.post("https://ecommerce-p3mq.onrender.com/admin", body)
        console.log(get);
    }

    const changeUser = async (user) => {
        const body = 
        {
            id : user.id,
            userName : userNameIn === "" ? user.userName : userNameIn,
            password : userPasswordIn === "" ? user.password : userPasswordIn,
            valor : userTelIn === "" ? user.telefono : userTelIn,
            cantidad : userEmailIn === "" ? user.email : userEmailIn,
        }
        changeAdmin(body);
        alert("Los datos han sido actualizados,se veran reflejados la proxima vez que ingrese...");
       window.location.reload();//Recargar pagina
    }

    const SesionOut = () =>{//boton para cerrar la sesion
        alert("Sesion cerrada...");
		setUser("");//Nombre del usuario vacio(el usuario ha cerrado su sesion)
        navigate('/login');//navega al login
	}

    return(//Luego retornamos una estructura html
        
        <div className='container-admin' >
            
            <div className='titleAdmin'><h2>Datos del admin</h2></div>
                <div className='containerAdmin'>
                    
                    <input type="text" className='inputAdmin' placeholder="Ingrese su nuevo nombre" onChange={ (e) => setUserNameIn(e.target.value)}></input>
                    <input type="text" className='inputAdmin' placeholder="Ingrese su nueva contraseña" onChange={ (e) => setUserPasswordIn(e.target.value)}></input>
                    <input type="number" className='inputAdmin' placeholder="Ingrese su nuevo telefono" onChange={ (e) => setUserTelIn(e.target.value)}></input>
                    <input type="text" className='inputAdmin' placeholder="Ingrese su nuevo email" onChange={ (e) => setUserEmailIn(e.target.value)}></input>
                    <span className="material-symbols-outlined" onClick={() =>{changeUser(user)}}>history_edu</span>
                    <span className="material-symbols-outlined" title="Cerrar sesion" onClick={SesionOut}>door_open</span>
                </div>
                
                <div className='titleProductsadmin'><h1>Productos</h1></div><br/>
                <div className='nota'><h3>Nota: cada producto debe ser actualizado de uno en uno dando click al boton de guardar.</h3></div>
            <div className='container-titles'>
                <h2>Nom Producto</h2>
                <h2>Precio</h2>
                <h2>Cantidad</h2>
                <h2>S.minimo</h2>
                <h2>Stock</h2>
                <h2>S.maximo</h2>
                <h2>Description</h2>
            </div>

        {
        products.map( (product) =>(//La funcion map lo que hace es recorrer a products como un arreglo y por cada posicion se realiza 
                                    //un bloque de codigo html con los datos del producto en la posicion que se encuentre map
            <div className='container_product_admin' key={product.id}>
            <input type="text" className='Title_product_admin'title={product.nombre} placeholder={ product.nombre } onChange={ (e) => setNameProduct(e.target.value)}></input>
                <input type="text"  className='Value_Product_admin'placeholder={ product.valor } onChange={ (e) => setValueProduct(e.target.value)}></input>
                <input type="number" className='Cantidad_Product_admin' placeholder={ product.cantidad } onChange={ (e) => setQuantityProduct(e.target.value)}></input>
                <input type="number" className='Cantidad_Product_admin'placeholder={ product.minimo } onChange={ (e) => setMinProduct(e.target.value)}></input>
                <input type="number" className='Cantidad_Product_admin'placeholder={ product.stock } onChange={ (e) => setStockProduct(e.target.value)}></input>
                <input type="number" className='Cantidad_Product_admin'placeholder={ product.maximo } onChange={ (e) => setMaxProduct(e.target.value)}></input>
                <input type="text" className='Description_Product_admin' placeholder={ product.description } onChange={ (e) => setDesProduct(e.target.value)} title={product.description}></input>
                <span className="material-symbols-outlined" onClick={() =>{changeRegistered(product)}}>history_edu</span>
            </div> ))
             } 
             <div className='footer-login'><h1>Rico Shop</h1></div>
        </div> 
        
    );


}

export default useAdmin