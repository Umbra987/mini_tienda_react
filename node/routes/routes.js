import  express  from "express";
import { getAllProducts, UpdateProduct} from "../controlers/BlogControler.js"
import { getAllUsers ,createUser, Updateuser } from "../controlers/ControlerUser.js";
import mercadopago from 'mercadopago'




const router = express.Router();

//Los routers son las peticiones que vamos a hacer al servidor mediante una url especifica
//Como las que tenemos aca que son para mostrar todos los productos y para mostrar un unico producto
router.get('/products',getAllProducts);
router.post('/products',UpdateProduct);



router.get('/login',getAllUsers);


router.get('/admin',getAllUsers);
router.post('/admin',Updateuser);
router.post('/change', UpdateProduct);

router.get('/register',getAllUsers);
router.post('/register',createUser);



//router.put('/admin')

export default router;