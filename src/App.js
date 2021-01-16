import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders'

const promise = loadStripe('pk_test_51HqHC0KUEqdWaOUobpYeVcAyrPr9XFFxZkIDtEdjwnM7CzpYgBkvkyibX8XMgswWZF2UQ1NvCdV06LnadCTZzcLC00kkFo8cE7');


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
auth.onAuthStateChanged(authUser => {
console.log('The user is authentificated: ', authUser)
authUser ? dispatch({type: 'SET_USER', user: authUser}) : dispatch({type: 'SET_USER', user: null});
})
}, []);
  return (
    <Router>
    <div className='app'>
    <Header />

    <Switch>
    <Route path='/orders'>
    <Orders />
    </Route>
    <Route path='/login'>
    <Login />
    </Route>
    <Route path='/checkout'>
    <Checkout />
    </Route>
    <Route path='/payment'>
    <Elements stripe={promise}>
    <Payment />
    </Elements>  
    </Route>
    <Route path='/'>
    <Home />
    </Route>
    </Switch>
   
    </div>
    </Router>
  );
}

export default App;
