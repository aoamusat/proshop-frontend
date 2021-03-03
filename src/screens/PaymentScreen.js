import React from "react";
import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => {
        return state.cart;
    });
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <div>
            <FormContainer>
                <h1>Payment Method</h1>
                <CheckoutStep step1 step2 step3 />
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">
                            Select a Payment Method
                        </Form.Label>

                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal"
                                id="PayPal"
                                name="PAYMENT_METHOD"
                                checked
                                value="PayPal"
                                onChange={(event) => {
                                    setPaymentMethod(event.target.value);
                                }}></Form.Check>
                            <Form.Check
                                type="radio"
                                label="Credit Card/Bank Transfer"
                                id="credit-card"
                                name="PAYMENT_METHOD"
                                value="Credit Card/Bank Transfer"
                                onChange={(event) => {
                                    setPaymentMethod(event.target.value);
                                }}></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        className="btn-block">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
};

export default PaymentScreen;
