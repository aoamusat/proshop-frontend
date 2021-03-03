import React from "react";
import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };

    return (
        <div>
            <FormContainer>
                <h1>Shipping</h1>
                <CheckoutStep step1 step2 />
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="address"
                            placeholder="123 Martins Street"
                            name="address"
                            required
                            value={address}
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            required
                            value={city}
                            onChange={(event) => {
                                setCity(event.target.value);
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postcode">
                        <Form.Label>Zip/Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Postal Code"
                            name="postcode"
                            required
                            value={postalCode}
                            onChange={(event) => {
                                setPostalCode(event.target.value);
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nigeria"
                            name="country"
                            required
                            value={country}
                            onChange={(event) => {
                                setCountry(event.target.value);
                            }}></Form.Control>
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

export default ShippingScreen;
