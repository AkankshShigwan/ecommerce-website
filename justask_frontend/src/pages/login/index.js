import { Button, FloatingLabel, Form } from "react-bootstrap";
import Layout from "../../components/layout";
import "../../style/login.css";


export default function Login() {
    return (
        <>
            <Layout >
                <div className="login-wrapper d-flex justify-content-center align-items-center">
                    <div className="login-card p-4 rounded-4 shadow-sm">
                        <h3 className="text-center mb-4" style={{ color: '#3f5e56' }}>Login to Your Account</h3>

                        <Form>
                            <FloatingLabel controlId="login_email" label="Email id" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    className="rounded-pill border-0 shadow-sm px-4"
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="login_password" label="Password" className="mb-4">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className="rounded-pill border-0 shadow-sm px-4"
                                />
                            </FloatingLabel>

                            <div className="text-center">
                                <Button className="w-100 rounded-pill login-btn py-2">Log In</Button>

                                <a href="/ForgetPassword">
                                    <p className="mt-3 forget-password">Forget Password ?</p>
                                </a>
                            </div>
                        </Form>
                    </div>
                </div>

            </Layout>
        </>
    )
}