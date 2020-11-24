import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductCategoryScreen from "./screens/ProductCategoryScreen";
import CartScreen from "./screens/CartScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-5">
                <Container>
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route
                        path="/products/:category"
                        component={ProductCategoryScreen}
                    />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
