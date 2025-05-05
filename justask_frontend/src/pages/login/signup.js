import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Layout from "../../components/layout";
import Button from 'react-bootstrap/Button';

export default function SignUp() {
    return (
    <Layout >
        <div className='signup-container'>
            <h3 className='mt-3 text-center'>Sign Up</h3>
            <Form className='my-4'>
                <FloatingLabel controlId="signup_name" label="Name" className="mb-3">
                    <Form.Control type="text" placeholder="" />
                </FloatingLabel>
                <FloatingLabel controlId="signup_email" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="signup_mobile" label="Mobile No." className="mb-3">
                    <Form.Control type="number" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="signup_password" label="Create Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <FloatingLabel controlId="signup_confirmpassword" label="Confirm Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <div className='text-center'>
                    <Button>Submit</Button>
                </div>
            </Form>
        </div>
    </Layout>
)}