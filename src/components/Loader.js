import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <Spinner
            role="status"
            animation="border"
            variant="info"
            style={{
                height: "100px",
                display: "block",
                width: "100px",
                margin: "auto",
            }}>
            <span className="sr-only">Loading products...</span>
        </Spinner>
    );
};

export default Loader;
