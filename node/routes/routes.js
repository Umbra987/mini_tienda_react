import  express  from "express";
import { getAllProducts, UpdateProduct} from "../controlers/BlogControler.js"
import { getAllUsers ,createUser, Updateuser } from "../controlers/ControlerUser.js";
import mercadopago from 'mercadopago'




const router = express.Router();

//Los routers son las peticiones que vamos a hacer con los controladores al servidor mediante una url especifica
//Como las que tenemos aca que son para mostrar todos los productos y para mostrar un unico producto

router.get('/products',getAllProducts);//Extraer todos los productos de la base de datos
router.post('/products',UpdateProduct);//Actualizar un producto en la base de datos



router.get('/login',getAllUsers);//Extraer todos los usuarios de la base de datos


router.get('/admin',getAllUsers);//Extraer todos los usuarios de la base de datos
router.post('/admin',Updateuser);//Actualizar un usuario en la base de datos
router.post('/change', UpdateProduct);//Actualizar un producto en la base de datos

router.get('/register',getAllUsers);//Extraer todos los usuarios de la base de datos
router.post('/register',createUser);//Crear un nuevo usuario en la base de datos



//router.put('/admin')

export default router;