

import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import ShowHeader from './Componentes/header.js';
import MostrarProductos from './Componentes/MostrarProducts'
import Login from './Componentes/login.js';
import Register from './Componentes/register.js';
import Admin from './Componentes/admin.js'
import { useLocalStorage } from './Componentes/localStorage';


function App() {

  



  //Aca lo que hacemos es crear todas las constante que vamos a usar para realizar el carrito de nuestra pagina
  const [allProducts,setAllProducts] = useLocalStorage('allProducts', ([])); //Lista de los productos que hay en él
  const [total,setTotal] = useLocalStorage('total', (0));//Valor total a pagar
  const [countProducts,setCountProducts] = useLocalStorage('countProducts', (0));//Contador de productos en el carrito
  const[user,setUser] =useLocalStorage('user', (""));

  //Les entregamos todo esto ya que tanto ShowHeader como MostrarProductos haran cosas distintas con ellos
  //Como es actualizarlos,añadir,eliminar productos de la lista y van a necesitar estos valores para actualizar el carrito
  return (



    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/admin' element={<Admin 
        user={user}
        setUser={setUser}
        />} />
        
      <Route path='/login' element={<Login 
      user={user} 
      setUser={setUser}
      />} />

      <Route path='/register' element={<Register
      user={user} setUser={setUser}
      />} />

      <Route path='/' element={
      <>  
      <ShowHeader 
      user={user} 
      setUser={setUser}
      allProducts={allProducts}
      setAllProducts={setAllProducts}
      total={total}
      setTotal={setTotal}
      countProducts={countProducts}
      setCountProducts={setCountProducts}
      />
      <MostrarProductos 
      allProducts={allProducts}
      user={user}
      setAllProducts={setAllProducts}
      total={total}
      setTotal={setTotal}
      countProducts={countProducts}
      setCountProducts={setCountProducts}
      />
        </>
        } />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

//Exportamos a App
export default App;
