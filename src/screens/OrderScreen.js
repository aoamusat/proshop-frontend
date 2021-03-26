import React, { useEffect, useState } from "react";
import { Row, ListGroup, Col, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const OrderScreen = (props) => {
    const { match } = props;
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => {
        return state.orderDetails;
    });

    const { order, error, loading } = orderDetails;

    let flutterConfig = {};

    if (order) {
        flutterConfig = {
            public_key: process.env.REACT_APP_FLUTTER_PUBLIC_KEY,
            tx_ref: Date.now(),
            amount: order.totalPrice,
            currency: "NGN",
            redirect_url: `http://localhost:3000/order/${order._id}`,
            payment_options: "card,mobilemoney,ussd",
            customer: {
                email: `${order.user.email}`,
                name: `${order.user.name}`,
            },
            customizations: {
                title: "Proshop | Gears for Developers",
                description: "Payment for items in cart",
                logo:
                    "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
            },
        };
    }

    useEffect(() => {
        dispatch(getOrderDetails(`${orderId}`));
    }, []);

    const handlePayment = useFlutterwave(flutterConfig);

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }

    return loading ? (
        <Loader></Loader>
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : order ? (
        <React.Fragment>
            <Row>
                <Col md={8}>
                    <h3>Order: {order._id}</h3>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2
                                style={{
                                    fontSize: "21px",
                                    textTransform: "capitalize",
                                }}>
                                Shipping
                            </h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email Address: </strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                Address: {order.shippingAddress.address},{" "}
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Payment Method: {order.paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2
                                style={{
                                    fontSize: "21px",
                                    textTransform: "capitalize",
                                }}>
                                Order Items
                            </h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is Empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        {item.quantity} x
                                                        &#8358;
                                                        {item.price} = &#8358;
                                                        {item.quantity *
                                                            item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price: </Col>
                                    <Col>
                                        &#8358; {order.itemsPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price: </Col>
                                    <Col>
                                        &#8358; {order.shippingPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (VAT): </Col>
                                    <Col>{order.taxRate}% </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>
                                        &#8358; {order.totalPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Payment status: </Col>
                                    <Col>
                                        {order.isPaid
                                            ? "Payment successful"
                                            : "Not Paid"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <Button
                                            onClick={() => {
                                                handlePayment({
                                                    callback: (response) => {
                                                        console.log(response);
                                                        closePaymentModal();
                                                    },
                                                });
                                            }}
                                            className="btn-block"
                                            disabled={order.isPaid}>
                                            Proceed to Payment
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    ) : (
        <Message></Message>
    );
};

export default OrderScreen;
