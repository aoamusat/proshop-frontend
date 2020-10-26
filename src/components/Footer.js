import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="container-fluid bg-teal font-weight-bold">
            <Row>
                <Col>
                    <p className="text-center py-3">
                        Copyright &copy; 2020. ProShop Limited.
                    </p>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
