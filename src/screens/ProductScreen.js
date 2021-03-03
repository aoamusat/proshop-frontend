import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}/?qty=${quantity}`);
        console.log(product.name + " added to cart!");
    };

    return (
        <React.Fragment>
            <Link className="btn btn-primary my-3" to={"/"}>
                Go back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h4>{product.name}</h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating
                                    value={product.rating}
                                    text={`   ${product.numReviews} reviews`}
                                />
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>Price: &#8358; {product.price}</strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                <strong>
                                    Description:&nbsp;{product.description}
                                </strong>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>
                                                &#8358;&nbsp;{product.price}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? "In stock"
                                                    : "Out of Stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={quantity}
                                                    onChange={(event) =>
                                                        setQuantity(
                                                            event.target.value,
                                                        )
                                                    }>
                                                    {[
                                                        ...Array(
                                                            product.countInStock,
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
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Category:</Col>
                                        <Col>
                                            <strong>
                                                <Link
                                                    className="primary"
                                                    to={`/products/${product.category}`}>
                                                    {product.category}
                                                </Link>
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        variant="info"
                                        className="btn-block"
                                        disabled={`${
                                            product.countInStock <= 0 ||
                                            quantity <= 0
                                                ? "disabled"
                                                : ""
                                        }`}
                                        type="button">
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </React.Fragment>
    );
};

export default ProductScreen;
