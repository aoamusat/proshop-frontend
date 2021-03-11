import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const FlutterComponent = (props) => {
    const { order } = props;

    const config = {
        public_key: process.env.FLUTTER_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: 2000,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: "order.user.email",
            name: "order.user.name",
        },
        customizations: {
            title: "Proshop",
            description: "Payment for items in cart",
            logo:
                "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    };

    const fwConfig = {
        ...config,
        text: "Pay with Flutterwave!",
        callback: (response) => {
            console.log(response);
            closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
    };

    return (
        <div className="Row">
            <FlutterWaveButton {...fwConfig} />
        </div>
    );
};

export default FlutterComponent;
