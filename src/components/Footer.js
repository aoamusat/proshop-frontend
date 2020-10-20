import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <Container style={{ backgroundColor: "red" }}>
            <Row>
                <Col>
                    <p className="text-center py-3">
                        Copyright &copy; 2020. ProShop Limited.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
