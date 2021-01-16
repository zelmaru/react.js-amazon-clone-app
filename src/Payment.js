import React, {useState, useEffect} from 'react';
import './Payment.css'
import { useStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct'
import {Link, useHistory} from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from './reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const singular = "item";
    const plural = "items";

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate stripe secret to charge the user
        // with every basket change generate a new secret to charge the right amount
        // create and call an async function
        const getClientSecret = async () => {
            // 
            const response = await axios({
                method: 'post',
                // Stripe expects the total in the currency subunits (multiply by 100)
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)

        }
        getClientSecret();
    }, [basket])
    console.log('THE SECRET IS >>>', clientSecret)
    
    const handleSubmit = async (event) => {
        // Stripe stuff
        // disable refreshing
        event.preventDefault();
        // prevent from hitting enter again (only hits once and then it blocks)
        setProcessing(true);
        // make client secret (in getClientSecret)
        // clientsecret tells stripe how much to charge 


        const payload = await stripe.confirmCardPayment(clientSecret, {payment_method: {
            card: elements.getElement(CardElement),
        }
    }).then(({paymentIntent}) => {
    // p.i. = payment confirmation
    // set the firebase db
    db
    .collection('users')
    .doc(user?.uid)
    .collection('orders')
    .doc(paymentIntent.id)
    .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
        })
    // set this stuff, redirect the customer to orders page
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    dispatch({
        type: 'EMPTY_BASKET'
    })

    history.replace('/orders');

    }) 

       


    }

    const handleChange = event => {
        // listen for changes inside Card El., display errors in card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }

        return (
            <div className="payment">
            <div className="payment__container">
            <h1>Checkout (<Link to='/checkout'>{basket?.length} {basket.length === 1 ? singular : plural}</Link>)</h1>
            <div className="payment__section">
                <div className="payment__title">
                <h3>Delivery Address</h3>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>First line</p>
                    <p>Second</p>
                </div>
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment__items">
                    {basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                             />
                    ))}
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                <h3>Payment Method</h3>
                    
                </div>
                <div className="payment__details">
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />
                    <div className="payment__priceContainer">
                    <CurrencyFormat renderText={(value) => (
                   <h3>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        />
        <button disabled={processing || disabled || succeeded}>
        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
        </button>
        </div>
        {error && <div>{error}</div>}
                </form>

                </div>
            </div>
                       
            </div>                
            </div>
        );
    }

export default Payment;