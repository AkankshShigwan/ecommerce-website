import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function header() {
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

                                <a href="/LoginPage">
                                    <Button className="">Login</Button>
                                </a>
                                <span style={{ color: "#fff" }} >/</span>
                                <a href="/Signup">
                                    <Button >Sign Up</Button>
                                </a>
                            </Navbar.Text>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default header;