import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = (props) => {
    const { product } = props;

    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image}></Card.Img>
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            </Card.Body>

            <Card.Text as="div">
                <Rating
                    value={product.rating}
                    text={`Rating from ${product.numReviews}`}
                />
            </Card.Text>
            <Card.Text as="h3">&#36; {product.price}</Card.Text>
        </Card>
    );
};

export default Product;
