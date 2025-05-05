import { Button, FloatingLabel, Form } from "react-bootstrap";
import Layout from "../../components/layout";

function forget_password() {
    return (
        <Layout>
            <div className='forgetpassword_container'>
                <div className="text-center">
                    <Button className="text-center common_btn">Send OTP</Button>
                    <FloatingLabel controlId="verification_code" label="Verification Code" className="my-3">
                        <Form.Control type="number" placeholder="" />
                    </FloatingLabel>
                </div>
                <hr className="my-5" />
                <div className="text-center">
                    <FloatingLabel controlId="new_password" label="Create New Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <FloatingLabel controlId="confirm_newpassword" label="Confirm New Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <Button className='common_btn'>Submit</Button>
                </div>
            </div>
        </Layout>
    )

};

export default forget_password;