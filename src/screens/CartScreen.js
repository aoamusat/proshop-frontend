import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Form,
    Button,
    ListGroup,
    Image,
    Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
    const productID = match.params.id;
    const quantity = location.search
        ? Number(location.search.split("=")[1])
        : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => {
        return state.cart;
    });

    const { cartItems } = cart;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, quantity));
        }
    }, [dispatch, productID, quantity]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ textTransform: "none" }}>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="info" style={{ textAlign: "center" }}>
                        Your cart is empty!{" "}
                        <Link to="/">
                            <strong>Continue shopping</strong>
                        </Link>
                    </Message>
                ) : (
                    <>
                        <Row style={{ fontWeight: "bold" }}>
                            <Col md={2}>Product</Col>
                            <Col md={3}></Col>
                            <Col md={2}>Price</Col>
                            <Col md={2}>Quantity</Col>
                            <Col md={2}>Remove</Col>
                        </Row>
                        <hr />
                        <ListGroup variant="flush">
                            {cartItems.map((item) => {
                                return (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Link
                                                    to={
                                                        "/product/" +
                                                        item.product
                                                    }>
                                                    <strong>{item.name}</strong>
                                                </Link>
                                            </Col>
                                            <Col md={2}>
                                                <strong>
                                                    $&nbsp;{item.price}
                                                </strong>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.quantity}
                                                    onChange={(event) => {
                                                        dispatch(
                                                            addToCart(
                                                                item.product,
                                                                Number(
                                                                    event.target
                                                                        .value,
                                                                ),
                                                            ),
                                                        );
                                                    }}>
                                                    {[
                                                        ...Array(
                                                            item.countInStock,
                                                        ).keys(),
                                                    ].map((x) => {
                                                        return (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    className="btn-block"
                                                    variant="light"
                                                    type="button"
                                                    onClick={() => {
                                                        removeItemFromCart(
                                                            item.product,
                                                        );
                                                    }}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>
                                Subtotal (
                                {cartItems.reduce((acc, item) => {
                                    return acc + item.quantity;
                                }, 0)}
                                ) Items
                            </h4>
                            <p>
                                $&nbsp;
                                <strong>
                                    {cartItems
                                        .reduce((accumulator, item) => {
                                            return (
                                                accumulator +
                                                item.quantity * item.price
                                            );
                                        }, 0.0)
                                        .toFixed(2)}
                                </strong>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
