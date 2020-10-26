import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`/api/product/${match.params.id}`);
            console.log(match.params.id);
            setProduct(response.data);
        };

        fetchProduct();
    }, [match]);

    return (
        <React.Fragment>
            <Link className="btn btn-primary my-3" to={"/"}>
                Go back
            </Link>
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
                            <strong>Price: &#36; {product.price}</strong>
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
                                            &#36;&nbsp;{product.price}
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
                            <ListGroup.Item>
                                <Button
                                    variant="info"
                                    className="btn-block"
                                    disabled={`${
                                        product.countInStock <= 0
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
        </React.Fragment>
    );
};

export default ProductScreen;
