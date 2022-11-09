import React from "react";
import Header from './Header/header';
import Map from './MAPS/mapas';
import { Main } from './Main/Main';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Axios from 'axios';
import '../../css/checkout.css'

const App = () => {

    const stripePromise = loadStripe("pk_test_51M1o9GIDq5OU7SfMWWFPWGqjif0SjsOahkGVz0M3VK3kOJURE8ritnqkPC5bHOFNv9kHaqQ08b4D0kTkOO3bSPZR00dH8AbddO")

    const CheckOutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (e) => {
            e.preventDefault();

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (!error) {
                const { id } = paymentMethod;

                try {
                    const { data } = await Axios.post('http://localhost:3001/api/checkout', {
                        id,
                        amount: 1000
                    })
                    console.log(data)
                    elements.getElement(CardElement).clear();
                } catch (error) {
                    console.log(error)
                };
            };
            // console.log(elements.getElement(CardElement))
        }

        return (
            <>
                <form
                    className='form'
                    onSubmit={handleSubmit} >
                    <CardElement />
                    <h3>10$</h3>
                    <button type="submit" disabled={!stripe}>Pagar</button>
                </form>
            </>
        )
    }

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Main />} />
                <Route
                    path="/map"
                    element={<Map />} />
            </Routes>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </BrowserRouter>
    );
}

export default App;