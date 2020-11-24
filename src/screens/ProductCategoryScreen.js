import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product.js";
import axios from "axios";

const ProductCategoryScreen = ({ match }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(
                `/api/products/category/${match.params.category}`,
            );
            console.log(match.params.category);
            setProducts(response.data);
        };

        fetchProducts();
    }, [match]);

    return (
        <React.Fragment>
            <h1 className="text-center">{match.params.category} Products</h1>
            <Row>
                {products.map((product) => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    );
                })}
            </Row>
        </React.Fragment>
    );
};

export default ProductCategoryScreen;
