import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from "./StateProvider";
import {getBasketTotal} from './reducer';
import {useHistory} from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{ basket, user, subtotal }, dispatch] = useStateValue();
    const singular = "item";
    const plural = "items";
        return (
            <div className="subtotal">
                <CurrencyFormat renderText={(value) => (
                    <>
                <p>
    
                Subtotal ({basket?.length} {basket.length === 1 ? singular : plural}): <strong>{value}</strong>

                </p>
                <small className="subtotal__gift"><input type="checkbox" name="" id=""/>This order contains a gift</small>
                </>
                
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        />
        <button onClick={event => history.push('/payment')}>Proceed to Checkout</button>
            </div>
        );
    }

export default Subtotal;