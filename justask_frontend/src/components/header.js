import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../reduxstore/modelslice';
import MyCart from '../pages/mycart';

function Header() {

    const dispatch = useDispatch();

    return (
        <Navbar expand="lg" className="headercss">
            <Container>
                {/* <Navbar.Brand href="#home"><i className="fa fa-star mx-2" aria-hidden="true"></i>JustAsk</Navbar.Brand> */}
                <Navbar.Brand href="#home">
                    <img src='/icons/login-icon/justAsk_logo.png' alt="Just Ask Logo" width="90px" height="25px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <div className='col-12 d-flex'>
                        <Form className='col-lg-5'>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2 form-control hover-search w-full border border-gray-300 rounded-lg px-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </Form>
                        <div className='col-lg-7 px-4 my-auto d-flex justify-content-end'>
                            {/* <i className="fa fa-user-circle-o" aria-hidden="true"></i> */}
                            <Navbar.Text className="d-flex align-items-center px-2 py-0">
                                <i className="fa fa-user-circle" aria-hidden="true" style={{ color: "#fff", fontSize: "1.5rem" }}></i>
                                <a >
                                    <Button className="">Akshu</Button>
                                </a>
                                <a href="/LoginPage">
                                    <Button className="">Login</Button>
                                </a>
                                <span style={{ color: "#fff" }} >/</span>
                                <a href="/Signup">
                                    <Button >Sign Up</Button>
                                </a>
                                {/* <Button variant="primary" onClick={() => dispatch(openModal())} className="me-2">
                                    <i className="fa fa-shopping-cart" aria-hidden="true" style={{ color: "#fff", fontSize: "1.5rem" }}></i>
                                </Button>
                                <MyCart /> */}
                            </Navbar.Text>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;