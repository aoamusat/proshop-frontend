import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user]);

    /**
     * Handles register form submission
     * @param {Event} event
     * @returns {null}
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Updating profile");
        dispatch(
            updateUserProfile({
                id: user._id,
                name: name,
                email: email,
                password: password,
            }),
        );
    };

    return (
        <Row>
            <Col md={7}>
                <h2 className="text-center">My Profile</h2>
                {error && <Message variant="danger">{error}</Message>}
                {loading && (
                    <Message variant="success">Updating profile...</Message>
                )}
                {success && (
                    <Message variant="success">
                        {"Profile updated successfully!"}
                    </Message>
                )}
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
                            requiredfron
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>New Password</Form.Label>
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
                    <Button
                        type="submit"
                        variant="primary"
                        className="btn-block">
                        Update Profile
                    </Button>
                </Form>
            </Col>
            <Col md={5}>
                <h2 className="text-center">My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
