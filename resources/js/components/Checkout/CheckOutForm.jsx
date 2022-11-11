import React from "react";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;

            try {
                const { data } = await Axios.post(
                    "http://localhost:3001/api/checkout",
                    {
                        id,
                        amount: 6000,
                    }
                );
                console.log(data);
                elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
            <form className="form" onSubmit={handleSubmit}>
                <CardElement />
                {/* <h3>{amount}</h3> */}
                <button type="submit" disabled={!stripe}>
                    Pagar
                </button>
            </form>
    );
};

export default CheckOutForm;
