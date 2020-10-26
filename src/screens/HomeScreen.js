import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h1 className="text-center">Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default HomeScreen;
