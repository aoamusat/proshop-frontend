import React from "react";
import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
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
                        <Form.Label as="legend">Select Method</Form.Label>

                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                name="PAYMENT_METHOD"
                                checked
                                value="PayPal"
                                onChange={(event) =>
                                    setPaymentMethod(event.target.value)
                                }></Form.Check>
                            <Form.Check
                                type="radio"
                                label="Stripe"
                                id="Stripe"
                                name="PAYMENT_METHOD"
                                value="Stripe"
                                onChange={(event) =>
                                    setPaymentMethod(event.target.value)
                                }></Form.Check>
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
