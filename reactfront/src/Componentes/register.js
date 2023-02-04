import React, { useState , useEffect } from "react";
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import "../Styles/login.css"

const URL = "https://ecommerce-p3mq.onrender.com/register/";

export const useRegister = ({user,setUser}) =>{

    //Variables de estado donde se guardaran los datos del nuevo usuario
    const [nameIn, setNameIn] = useState('');//Variable de estado del nombre
    const [passwordIn, setPasswordIn] = useState('');//Variable de estado de la contraseña
    const [telIn, setTelIn] = useState('');//Variable de estado del telefono
    const [emailIn, setEmailIn] = useState('');//Variable de estado del email

    const navigate = useNavigate();

    //Extraemos todos los usuarios de la base de datos.
    const getUsers = async () => {
        const resultados = await axios.get(URL);
        setUsers(resultados.data);
        
    };

    /*
    Para que se ejecute alguna acción solo cuando se monta el componente en pantalla, el
	segundo parámetro de useEffect debe ser un Array vacío. 
    */
    useEffect( () => {
        getUsers();
    }, []);

   
    const [users,setUsers] = useState([]);

    const navigateLogin = () => {
        navigate('/login')//Navega al login
    };

//Primero verificamos que todos los campos esten llenos,luego buscamos si el nombre de usuario ya esta o no en uso
//Si el nombre existe entonces lo invalidamos, si el nombre no existe hacemos un solicitud post al servidor para que se
//cree un nuevo usuario en la base de datos
    const onRegisterUser = async (e) => {
        e.preventDefault();
        if(nameIn !== "" && passwordIn !== "" && telIn !== "" && emailIn !== ""){//Todos los campos estan llenos?

        if(users.find((u) => ((u.userName === nameIn)))){//Se verifica que nombre de usuario no exista ya
            alert('El nombre ingresado ya se encuentra en uso...');
            window.location.reload();//Recargar pagina
        } 
        else {
            navigateLogin();//Navega al login
            await axios.post(URL,{userName : nameIn, password : passwordIn, telefono : telIn, email : emailIn+"@gmail.com"});//Con una peticion post se crea el nuevo usuario en base de datos
            
        }
    }
    else{
        alert("Hay campos incompletos...");//Habia campos incompletos
        window.location.reload();//Recargar pagin
    } 
    };

    return(
        <div className="containerLogin">
        <div className="Register">
        <div className="imgRegister"><img src={require("../imgs/Rico.png")} alt="logoRico"/></div>
                <form className="containerRegister">
                <h1>Registro:<br></br></h1>
                <input value={nameIn} className="inputLogin" type="text" placeholder="Ingrese su usuario" onChange={ (e) => setNameIn(e.target.value) }/>
                <input value={passwordIn} className="inputLogin" type="password" placeholder="Ingrese su contraseña" onChange={ (e) => setPasswordIn(e.target.value) }/>
                <input value={telIn} className="inputLogin" type="number" placeholder="Ingrese su telefono" onChange={ (e) => setTelIn(e.target.value) }/>
                <input value={emailIn} className="inputLogin gmail" type="text" placeholder="Ingrese su correo" onChange={ (e) => setEmailIn(e.target.value)}/><p>@gmail.com</p>
                <div>
                <input type="submit" className="btnSubmit" value="Crear" onClick={onRegisterUser} />
                <input type="submit" className="btnSubmit" onClick={navigateLogin} value="Login" />
                </div>
                </form>          
        </div>
        </div>
    );
}


export default useRegister