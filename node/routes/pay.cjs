const pay = require('express').Router();
const CONFIG = "sk_test_51MX8LDAAbcGRHR0kQivZsgZ4aB6ZHsIvTBtwe2mbuBhyukkxF84JQEgo4e0qGz5kfK1KUPI8A99PD2A6sdofPL5A00UzzeF7zM";
const stripe = require ('stripe')(CONFIG);


pay.post("/pay",(req,res) =>{
    let {id,amount} = req.body;
    stripe.paymentIntents.create({
        amount: amount,//Monto total a pagar
        currency: 'cop',//moneda
        payment_method: id,
        confirm: true//Confirmacion del pago
    }).then((pay)=>{
        res.sendStatus(204);//retorno de estado
    }).catch((e)=>{
        console.log(e);//Mostramos en consola el error
        res.sendStatus(400);//retorno de estado
    });
});

module.exports = pay;