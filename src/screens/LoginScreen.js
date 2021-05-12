import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const LoginScreen = (props) => {
    const { location, history } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => {
        return state.userLogin;
    });

    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
            window.location.reload();
        }
    }, [location, history]);

    /**
     * Handles login form submission
     * @param {Event} event
     * @returns {null}
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(location);
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h2 className="text-center">Sign In</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Message variant="success">Logging you in...</Message>}
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="someone@example.com"
                        name="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <div className="checkbox mb-3">
                        <label data-children-count="1">
                            <input type="checkbox" value="remember-me" />{" "}
                            Remember me
                        </label>
                    </div>
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-block">
                    Login
                </Button>
            </Form>
            <Row className="py-3">
                <p>
                    New customer? <Link to="/register">Register here</Link>
                    &nbsp;&nbsp; Forget password?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect${redirect}`
                                : "/register"
                        }>
                        Reset Password
                    </Link>
                </p>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
