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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"><i class="fa fa-star mx-2" aria-hidden="true"></i>JustAsk</Navbar.Brand>
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
                            {/* <i class="fa fa-user-circle-o" aria-hidden="true"></i> */}
                            <Navbar.Text className='px-2 py-0'>
                                <Button>Login</Button>
                                <Button className='mx-2'>Sign Un</Button>
                            </Navbar.Text>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default header;