import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => {
        return state.userRegister;
    });

    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [dispatch, location, history, userInfo]);

    /**
     * Handles register form submission
     * @param {Event} event
     * @returns {null}
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(register(name, email, password));
        history.push('/login');
    };

    return (
        <FormContainer>
            <h2 className="text-center">Create your account.</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Message variant="success">Logging you in...</Message>}
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="John Doe"
                        name="name"
                        required
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="someone@example.com"
                        name="email"
                        value={email}
                        required
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your Password"
                        required
                        name="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <div className="checkbox mb-3">
                        <label data-children-count="1">
                            <input
                                required
                                type="checkbox"
                                value="remember-me"
                            />{" "}
                            By signing up you accept Proshop’s{" "}
                            <a href="#" target="_blank">
                                Terms of Service
                            </a>{" "}
                            and Privacy Policy. This site is protected by
                            reCAPTCHA and the Google Privacy Policy and Terms of
                            Service apply.
                        </label>
                    </div>
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-block">
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <p>
                    Already registered? <Link to="/login">Login here</Link>
                    &nbsp;&nbsp;
                </p>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
