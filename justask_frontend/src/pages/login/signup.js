import "../../style/signup.css";
import Layout from "../../components/layout";
import { Form, FloatingLabel, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';


export default function SignUp() {

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);


    return (
        // <Layout >
        <div className='signup-container p-4 shadow rounded-4 bg-white my-5' style={{ margin: 'auto' }}>
            <h3 className='text-center fw-bold' style={{ color: '#3f5e56' }}>Create Account</h3>
            <p className='text-center text-muted'>Sign up to get started!</p>

            <Form className='my-4'>

                {/* Name */}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FaUser /></InputGroup.Text>
                        <Form.Control type="text" placeholder="Your Name" />
                    </InputGroup>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                        <Form.Control type="email" placeholder="Your Email" />
                    </InputGroup>
                </Form.Group>

                {/* Mobile */}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FaPhone /></InputGroup.Text>
                        <Form.Control type="number" placeholder="Your Number" />
                    </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FaLock /></InputGroup.Text>
                        <Form.Control type={showPassword ? 'password' : 'text'} placeholder="Password" />
                        <Button variant="outline-secondary eye-btn" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><FaLock /></InputGroup.Text>
                        <Form.Control type={showConfirmPassword ? 'password' : 'text'} placeholder="Password" />
                        <Button variant="outline-secondary eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <div className='text-center mt-4'>
                    <Button className='px-5 py-2 rounded-pill' variant="primary">Sign Up</Button>
                </div>
            </Form>
        </div>
        // </Layout>
    )
}