const pay = require('express').Router();
const CONFIG = "sk_test_51MX8LDAAbcGRHR0kQivZsgZ4aB6ZHsIvTBtwe2mbuBhyukkxF84JQEgo4e0qGz5kfK1KUPI8A99PD2A6sdofPL5A00UzzeF7zM";
const stripe = require ('stripe')(CONFIG);


pay.post("/pay",(req,res) =>{
    let {id,amount} = req.body;
    stripe.paymentIntents.create({
        amount: amount,
        currency: 'cop',
        payment_method: id,
        confirm: true
    }).then((pay)=>{
        res.sendStatus(204);
    }).catch((e)=>{
        console.log(e);
        res.sendStatus(400);
    });
});

module.exports = pay;