import React, { useState , useEffect } from "react";
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import "../Styles/login.css"

const URL = "https://ecommerce-p3mq.onrender.com/login/";

export const Login = ({user,setUser}) =>{          

    
    const navigate = useNavigate();

    const navigateToRegister = () =>{
        navigate('/register');//navega al register
    }

    const navigateToCatalogo = () =>{
        navigate('/');//navega al catalogo
    }

    //Son las variables de estado donde se va a guardar los valores ingresados en los inputs del login.
    const [entrada,setEntrada] = useState('');
    const [entradaP,setEntradaP]= useState('');

    
    //Extraemos a todos los usuarios de la base de datos
    const getUsers = async () => {
        const resultados = await axios.get(URL)
        Setusers(resultados.data)
    }

    const[users,Setusers] = useState ([]);
    useEffect(()=>{
        getUsers() 
    },[]);

    //Al mapear los usuarios verficamos si el usuario exista y si existe verficamos si la contraseña coincide.
    //Ya que el admin tiene el id 1 determinamos a que ventana navegaremos dependiendo de los valores entrados.
    const verificar = (e) =>{
        users.map((user) =>{
            if((user.userName === entrada) && (user.password) === entradaP ){

                if(user.id === 1){
                    setUser(user);//Insertamos el nombre del usuario que ingreso
                    navigate('/admin');//navega al apartado del admin
                }
                else{
                    setUser(user.userName);//Insertamos el nombre del usuario que ingreso
                    navigate('/');//navegal catalogo
                }    
            }
        })
        
    }


    return(
        <div className="containerLogin">

            <div className="login ">
                <div className="imgLogin"><img src={require("../imgs/Rico.png")} alt="logoRico"/></div>
                <form onSubmit={verificar} className="containerRegister">
                <div className="inputLogin" id="Nameuser"><input 
                value={entrada}
                onChange={ (e) => setEntrada(e.target.value)}
                type="text" placeholder="Ingrese su usuario" required></input></div>
                <div className="inputLogin" id="passwordUser"><input 
                value={entradaP}
                onChange={ (e) => setEntradaP(e.target.value)}
                type="password" placeholder="Ingrese su contraseña" required></input></div>
                <div className="btnContainer">
                <input type="submit" className="btnSubmit" ></input>
                <input type="submit" className="btnSubmit" onClick={navigateToRegister} value="Registrarse" />
                <input type="submit" className="btnSubmit" onClick={navigateToCatalogo} value="Catalogo" />
                </div>
                </form>
                
            </div>
        </div>
    );
}


export default Login




