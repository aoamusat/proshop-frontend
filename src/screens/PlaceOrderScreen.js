import React, { useEffect } from "react";
import { Button, Row, ListGroup, Col, Image, Card } from "react-bootstrap";
import CheckoutStep from "../components/CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = (props) => {
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    // calculate prices using a reducer
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    cart.shippingPrice = cart.itemsPrice < 100 ? 3 : 20;

    // Calculate tax rate: 1% for items less than NGN5000
    cart.taxRate = cart.itemsPrice < 5000 ? 1 : 5;

    cart.totalPrice =
        cart.itemsPrice +
        (cart.taxRate / 100) * cart.itemsPrice +
        cart.shippingPrice;

    // Fetch orderCreate state from redux store
    const orderCreate = useSelector((state) => state.orderCreate);

    // Destructure the orderCreate state
    const { order, error, success } = orderCreate;

    const { history } = props;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
    }, [history, success]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: Number(cart.shippingPrice).toFixed(2),
                totalPrice: Number(cart.totalPrice).toFixed(2),
                taxRate: cart.taxRate,
            }),
        );
    };

    return (
        <>
            <CheckoutStep step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
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
                                Address: {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Payment Method: {cart.paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2
                                style={{
                                    fontSize: "21px",
                                    textTransform: "capitalize",
                                }}>
                                Order Items
                            </h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Empty Cart</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => {
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
                                    <Col>Item Price: </Col>
                                    <Col>
                                        &#8358; {cart.itemsPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price: </Col>
                                    <Col>
                                        &#8358; {cart.shippingPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (VAT): </Col>
                                    <Col>{cart.taxRate}% </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>
                                        &#8358; {cart.totalPrice.toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <div
                                        className="alert alert-danger"
                                        role="alert">
                                        <p>{error}</p>
                                        <p className="mb-0"></p>
                                    </div>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
