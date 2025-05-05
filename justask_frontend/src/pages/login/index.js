import { Button, FloatingLabel, Form } from "react-bootstrap";
import Layout from "../../components/layout";

export default function Login() {
    return (
        <>
            <Layout >
                <div className='login-container'>
                    <Form className='my-4'>
                        <FloatingLabel controlId="signup_email" label="Email id" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="signup_password" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <div className='text-center'>
                            <Button className="login-btn common_btn">Log In</Button>
                            <a href="/ForgetPassword"><p className="mt-2 font-2 forget_password">Forget Password ?</p></a>
                        </div>
                    </Form>
                </div>
            </Layout>
        </>
    )
}