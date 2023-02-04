import { CardElement,useElements} from '@stripe/react-stripe-js'
import { useStripe } from '@stripe/react-stripe-js';
import '../Styles/header.css'



export default function PayModal(promp){
    const comprar = promp.vaciar;
    const stripe = useStripe();
    const elements = useElements();
    function sumit(e){
        e.preventDefault();
        stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        }).then((paymentMethod)=>{
            if(!paymentMethod.paymentMethod){
                alert("Tarjeta invalida");
                return;
            }
            fetch("http://localhost:8000/pay",{
                method:'POST',
                body: JSON.stringify({
                    id: paymentMethod.paymentMethod.id,
                    amount : promp.amount
                }),
                headers: new Headers({
                    'Content-Type' : 'application/json'
                }),

            }).then((a)=>{
                if(a.status === 204){
                    comprar();
                    alert("Pago realizado.");
                    return;
                }
                alert("Pago no realizado.");
            });
        }).catch((e)=>{
            console.log(e);
            alert("Pago no realizado");
        })
    }

    return(
        <form onSubmit={sumit} className="ContainerPay">
            <CardElement />
            <button className='btn_pay'>Realizar Pago</button>    
        </form>
    )


}
