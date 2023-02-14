import React, { useState , useEffect } from "react";
import '../Styles/header.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import  PayModal  from './Pay.js'
import emailjs from '@emailjs/browser'


//Con sintaxis de desestructuracion obtenemos todos los valores que nos entrego App.js haciendolo de esta manera
//No tenemos que usar la notacion de punto,sino que directamente usamos la variable
const URL = "https://ecommerce-p3mq.onrender.com/products/";

const stripePromise = loadStripe("pk_test_51MX8LDAAbcGRHR0kZdoJ7icc44KgefTs6zm55ynKZuUoupKvnDWaKOJPzUBaYWTikfyf6XldiANQYIM0nOHghJQM00nhmDJUop");

const ShowHeader = ({allProducts,setAllProducts,total,countProducts,setTotal,setCountProducts,user,setUser}) => {

    console.log(user.id);
	
	const navigate = useNavigate(); 

	const navigateLogin = () => {
		if(user === ""){
			navigate('/login')//navega al login
		}
        else{
			alert("Sesion iniciada de " + user);//Ya hay una sesion iniciada
		}
    };

    //Para actualizar la base de datos cuando se aumenta un producto del carrito 
	const restProduct = async (body) => {
        const get =  await axios.post(URL, body)
        console.log(get);
    }

    //Cuando aumentamos la cantidad del producto en el carrito sumamos a la cantidad en el carrito y restamos al stock en base de datos
    const RegisteredUp = async (product) => {
        const body = 
        {
            id : product.id,//Id del producto
            nombre : product.nombre,//Nombre del producto
            valor : product.valor,//Valor del producto
            cantidad : product.cantidad + 1,//Cantidad del producto
            description : product.description,//Descripcion del producto
            minimo : product.minimo,//Stock minimo
            stock : product.stock - (product.cantidad + 1),//Stock del producto
            maximo : product.maximo//Stock maximo
        }
        restProduct(body);//Se resta al stock y se suma a la cantidad de los productos en el carrito
    }

    //Para actualizar la base de datos cuando se disminuya un producto del carrito 
	const restLowProduct = async (body) => {
        const get =  await axios.post(URL, body)
        console.log(get);
    }

    //Cuando disminuimos la cantidad del producto en el carrito restamos a la cantidad en el carrito y sumamos al stock en base de datos
    const RegisteredLow = async (product) => {
        const body = 
        {
            id : product.id,//Id del producto
            nombre : product.nombre,//Nombre del producto
            valor : product.valor,//Valor del producto
            cantidad : product.cantidad - 1,//Cantidad del producto
            description : product.description,//Descripcion del producto
            minimo : product.minimo,//Stock minimo
            stock : product.stock - (product.cantidad - 1),//Stock del producto
            maximo : product.maximo//Stock maximo
        }
        restLowProduct(body);//Se devuelve 1 producto reservado a la base de datos
    }

    //Para actualizar la base de datos cuando se limpie el carrito 
	const restDeleteProduct = async (body) => {
        const get =  await axios.post(URL, body)
        console.log(get);
    }


    //Elimina un producto devuelve la cantidad de producto reservado y la cantidad la devuelve a 1.
	const RegisteredDelete = async (product) => {
        const body = 
        {
            id : product.id,//Id del producto
            nombre : product.nombre,//Nombre del producto
            valor : product.valor,//Valor del producto
            stock : product.stock, // El stock vuelve a hacer el mismo que antes de la reserva
            cantidad : 1,//cantidad vuelve a 1
            description : product.description,//Descripcion del producto
            minimo : product.minimo,//Stock minimo
            maximo : product.maximo//Stock maximo
        }
        restDeleteProduct(body);//Se devuelve a la base de datos la cantidad reservada del producto
    }

	//Esta constante lo unico que va a hacer es decir si el carrito fue precionado o no
    const [active,setActive] = useState(false);

	//Esta constante recibe un producto del carrito ,luego lo elimina y resta tanto su 
	//cantidad como lo que valia a total y al contador de productos del carrito
    const onDeleteProduct = (product) =>{
        const resultados = allProducts.filter(item => item.id !== product.id);//se crea un nuevo arreglo donde no se añade el producto que fue eliminado del producto
        setTotal(total - product.valor * product.cantidad);//Se resta al total
		setCountProducts(countProducts - product.cantidad);//Se resta al contador
		RegisteredDelete(product);//Se devuelve a la base de datos la cantidad de productos reservados
		setAllProducts(resultados);//El arreglo ahora se vuelve el nuevo carrito
    }

	const onAddProduct = (product) =>{
        if(product.stock>0){//Si hay disponibilidad del producto?
        if((product.cantidad < product.maximo) && (product.cantidad >= product.minimo) ){
        if(allProducts.find(item => item.id === product.id) ){//Para añadir al producto que ya existe en el carrito
            //Si ya hay producto con el mismo id suma a cantidad,sino lo agrega
            const products = allProducts.map(item => item.id === product.id ? {...item,cantidad : item.cantidad + 1 } 
                : item
            );
            //Cada vez que se encuentre o no un producto con un id que ya esta en el carrtio,se actualiza
            //cual es el total a pagar
            setTotal(total + product.valor * product.cantidad);//Se suma al total
            //cuantos productos hay en el carrito
			setCountProducts(countProducts + 1);//Sumamos al contador de productos en el carrito
			RegisteredUp(product);//Se reserva un producto mas al carrito
            //y la lista de los productos que hay en el carrito
            return setAllProducts([...products]);

        }
        }
        else alert("Maximo de productos añadidos al carrito...");
    }
    else alert ("No hay más disponibilidad del producto.");
    }
	
	const onRemoveProduct = (product) =>{
		if(product.cantidad>1){//cantidad no puede ser 0
        if(allProducts.find(item => item.id === product.id)){
            //Si ya hay producto con el mismo id resta a cantidad
            const products = allProducts.map(item => item.id === product.id ? {...item,cantidad : item.cantidad - 1 } 
                : item
            );
            //Cada vez que se encuentre o no un producto con un id que ya esta en el carrtio,se actualiza
            //cual es el total a pagar
            setTotal(total - product.valor );//Restamos el valor del producto que se removio
            //cuantos productos hay en el carrito
			setCountProducts(countProducts - 1);//Restamos al contador de productos del carrito

			RegisteredLow(product);//Hacemos la reserva de los productos en base de datos
            //y la lista de los productos que hay en el carrito
            return setAllProducts([...products]);
        	}
		}
    }

	//Aca lo que se hace es vaciar por completo el carrito poniendolo como un espacio vacio,poniendo a total y a contador de productos en 0.
    const onCleanCart = () =>{
        const auxProducts = allProducts;//Guardamos el carrito en una variable auxiliar para devolver luego los productos reservados
        auxProducts.map(product => onDeleteProduct(product));//Mapeamos al carrito y vamos devolviendo los productos reservados
		setAllProducts([]);//Limpiamos todos los productos del carrito
        setTotal(0);//Total de la compra del carrito
        setCountProducts(0);//Contador de productos en el carritoetAllProducts([]);
        console.log(auxProducts)//Imprimimos a la variable auxiliar
    }

    const[products,setProduct] = useState([])

    useEffect ( ()=>{
        getProducts();//llamamos a getProducts
    },[]);

    //Mostrar todos los productos
    //Los productos los conseguimos usando axios.get(URL) que junto con express se conectan a la base de datos
    //obtienen todos los productos y con la funcion setProdcuts llenamos a products
    const getProducts = async () =>{
        const resultados = await axios.get(URL);
        setProduct(resultados.data);//insertamos toda la base de datos en la variable
    }

    //A traves de Email.js con un servicio de gmail y luego un template donde entregamos los valores de
    //from_name,message,product_id informamos al admin cual producto tiene poca cantidad
    function sentEmail (){
        products.map((product) =>{//Mapeamos a todos los productos
            if(product.stock <=5){
                emailjs.send("service_mk4go39","template_ikfpdjf",{// el servicio de emailjs y el template de emailjs
                    from_name: "Rico Shop",//de parte de
                    message: "Bajo contenido del producto con id",//mensaje
                    product_id: product.id,//id del producto con el stock con baja disponibilidad
                    },"p8A4s0hvrgDzNMBUn");//Llave publica de emailjs
            }
        }) 
    }

    //Cuando se realiza un pago se limpia todo el carrito y ademas se verifica cual de todos los productos tiene poca cantidad.
    const onClearPay = () =>{
        setAllProducts([]);//Limpiamos todos los productos del carrito
        setTotal(0);//Total de la compra del carrito
        setCountProducts(0);//Contador de productos en el carrito
        sentEmail();//Verificamos si algun producto tiene baja disponibilidad en bodega
    }

    //Cuando se da click en el boton de cerrar seion,se limpia el carrito y el usuario activo.
	const SesionOut = () =>{
        alert("Sesion cerrada...");
		setUser("");//Nombre del usuario vacio(el usuario ha cerrado su sesion)
		onCleanCart();//Para limpiar el carrito y devolver los productos reservado a la base datos
	}

    

    return (//En la linea 32 vemos para que sirve active que sirve es para añadir la clase none que quiere decir que el carrito esta desactivado y si se l removemos quiere decir que esta activo
        <div className="header">
			<h1>Rico Shop</h1>
            <div className="logo_header">
                <div className={`container-carrito-products ${active ? '' : 'none'}`}>
                {
                    allProducts.length ? (
                        <>
                        <div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'> 
											<div className="AddRow"   onClick={() => onAddProduct(product)}><img src="https://cdn-icons-png.flaticon.com/512/3838/3838683.png" alt="Sumar Producto"></img></div>
											<span className='cantidad-producto-carrito'>
												{product.cantidad}
											</span>
											<div className="RemoveRow"  onClick={() => onRemoveProduct(product)}><img src="https://cdn-icons-png.flaticon.com/512/3838/3838683.png" alt="Restar Producto"></img></div>
											<p className='titulo-producto-carrito'>
												{product.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${product.valor}
											</span>
										</div>
										
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>
							
							<div className='cart-total'>
								<h3>Total:</h3>
								
								<span className='total-pagar'>${total}</span>
							</div>
							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
                            <Elements  stripe={stripePromise}>
                                <PayModal amount={total*100}  vaciar ={() =>{onClearPay()}} /> 
                            </Elements>
						</>
					) : (
						<p className='cart-empty' >El carrito está vacío</p>
					)
                }
                 </div>
					
                
				
                <img src={require("../imgs/Rico.png")} alt="" /> 
                    
            </div>
            <div className="logo_carrito" >
				<div className="contador_items">{countProducts}</div>
				<span className="material-symbols-outlined" title="Cerrar sesion" onClick={SesionOut}>door_open</span>
				<span className="material-symbols-outlined" title="Perfil/Iniciar sesion" onClick={navigateLogin}>person</span>	
				<span className="material-symbols-outlined" onClick={() => setActive(!active)}>shopping_cart_checkout</span>
			</div>        
        </div>
    )
}

export default ShowHeader