import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-dark text-white">
            <div className="footer-main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <h6>About</h6>
                            <hr className="deep-purple  accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <p>
                                Codewigs is an open Digital Marketplace that
                                connect all developers to their protective
                                client or buyer in buying and selling ready to
                                use scripts and contents with 100% Risk Free.
                            </p>
                            <ul className="list-unstyled list-inline mt-3">
                                <li className="list-inline-item">
                                    <a
                                        href="http://facebook.com/proshop"
                                        target="_blank"
                                        className="btn ripple btn-floating btn-sm mx-1">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="http://twitter.com/codewigs"
                                        target="_blank"
                                        className="btn ripple btn-floating btn-sm mx-1">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.linkedin.com/in/codewigs"
                                        target="_blank"
                                        className="btn ripple btn-floating btn-sm mx-1">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.youtube.com/channel/UCcR20T7x_KLqFRC12f1z03Q"
                                        target="_blank"
                                        className="btn ripple btn-floating btn-sm mx-1">
                                        <i className="fa fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-12">
                            <h6>Quick Links</h6>
                            <hr className="deep-purple text-primary accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="/blog">Blogs</a>
                                </li>
                                <li>
                                    <a href="/forum">Forums</a>
                                </li>
                                <li>
                                    <a href="/support">Support</a>
                                </li>
                                <li>
                                    <a href="/about-us">About Us</a>
                                </li>
                                <li>
                                    <a href="/terms-and-conditions">
                                        Terms &amp; Condition
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy-and-policy">
                                        Privacy &amp; Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <h6>Contact</h6>
                            <hr className="deep-purple  text-primary accent-2 mb-4 mt-0 d-inline-block mx-auto" />
                            <ul className="footer-conatct list-unstyled mb-0 contact-footer">
                                <li>
                                    <a href="#">
                                        <i className="fa fa-home mr-3 text-white"></i>{" "}
                                        Obehira road Opposite Afirms hotel Okene
                                        Kogi State, Nigeria
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-envelope mr-3 text-white"></i>{" "}
                                        support@codewigs.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-phone mr-3 text-white"></i>{" "}
                                        + 234 705 822 2912
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-whatsapp mr-3 text-white"></i>{" "}
                                        + 234 705 822 2912
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <h6>Payments</h6>
                            <hr className="deep-purple  text-primary accent-2 mb-2 mt-3 d-inline-block mx-auto" />
                            <p>
                                Our payment system are easy, secure and user
                                friendly to use. <br /> Accepted payment method
                                listed below.
                            </p>
                            <div className="clearfix"></div>
                            <ul className="footer-payments">
                                <li className="pl-0">
                                    <a href="javascript:;">
                                        <i
                                            className="fa fa-cc-amex"
                                            aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i
                                            className="fa fa-cc-visa"
                                            aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i
                                            className="fa fa-credit-card-alt"
                                            aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i
                                            className="fa fa-cc-mastercard"
                                            aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i
                                            className="fa fa-cc-paypal"
                                            aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark text-white-50 p-0">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-lg-12 col-sm-12 mt-3 mb-3 text-center">
                            Copyright © 2020 - 2021{" "}
                            <a href="/" className="fs-14 text-primary">
                                CodeWigs
                            </a>
                            . Proudly Made In{" "}
                            <strong>
                                <span className="text-primary">NI</span>
                                <span className="text-light">GER</span>
                                <span className="text-primary">IA</span>
                            </strong>{" "}
                            All rights reserved.{" "}
                            <a href="/disclaimer" className="text-danger">
                                Disclaimer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
