import React from "react";
import Header from "./Header/header";
import Map from "./MAPS/mapas";
import CheckOutForm from "./Checkout/CheckOutForm";
import { Main } from "./Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../../css/checkout.css";

const App = () => {
    const stripePromise = loadStripe(
        "pk_test_51M1o9GIDq5OU7SfMWWFPWGqjif0SjsOahkGVz0M3VK3kOJURE8ritnqkPC5bHOFNv9kHaqQ08b4D0kTkOO3bSPZR00dH8AbddO"
    );

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/map" element={<Map />} />
                <Route
                    path="/checkout"
                    element={
                        <Elements stripe={stripePromise}>
                            <CheckOutForm />
                        </Elements>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
