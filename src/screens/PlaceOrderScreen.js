import React from "react";
import { Button, Row, ListGroup, Col, Image, Card } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutStep from "../components/CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    return (
        <>
            <CheckoutStep step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>
                                    Address: {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},
                                    {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}.
                                </strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>
                                <strong>
                                    Payment Method: {cart.paymentMethod}
                                </strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items: {cart.paymentMethod}</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => {
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded></Image>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>;
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
