import { Button, FloatingLabel, Form } from "react-bootstrap";
import Layout from "../../components/layout";
import "../../style/login.css";
import { useState } from "react";
import { base_url, login_url, sign_url } from "../../components/common/endpoints";
import axios from "axios";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);

    function handlelogin(e) {
        e.preventDefault()
        const payload = {
            p_auth_key: "",
            p_email: document.getElementById('email').value,
            p_password: document.getElementById('password').value
        };

        console.log("Payload to submit:", payload);

        axios.post(base_url + login_url, payload)
            .then((response) => {
                console.log('login details', response.data.data[0].msg);
            }).catch((err) => {
            });
    }

    function handlesign(e) {
        e.preventDefault()
        const payload = {
            p_auth_key: "",
            p_email: document.getElementById('signup_email').value,
            p_name: document.getElementById('user_name').value,
            p_mobile: document.getElementById('email').value,
            p_password: document.getElementById('signup_password').value,
            p_tag: "1",
            p_role: 1
        };

        console.log("Payload to submit:", payload);

        axios.post(base_url + sign_url, payload)
            .then((response) => {
                console.log('login details', response.data.data[0].msg);
            }).catch((err) => {
            });
    }

    return (
        <div className={`login-conatiner wrapper ${isRegister ? 'active' : ''}`}>
            <span className="bg-animate"></span>
            <span className="bg-animate2"></span>

            <div className="form-box login">
                <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
                <form>
                    <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                        <input type="email" id="email" className="login-inputs" required />
                        <label>Email</label>
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                        <input type="password" id="password" className="login-inputs" required />
                        <label>Password</label>
                        <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                    </div>
                    <button className="btn-sign animation" type="submit" style={{ '--i': 3, '--j': 24 }} onClick={(e) => { handlelogin(e) }}>Login</button>
                    <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
                        <p>
                            Don't have an account? <br />
                            <button type="button" className="register-link" onClick={() => setIsRegister(true)}>
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className="info-text login">
                <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome back!</h2>
                <p className="animation" style={{ '--i': 1, '--j': 21 }}>
                    We're happy to have you with us back again!
                </p>
            </div>

            <div className="form-box register">
                <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Sign up</h2>
                <form>
                    <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                        <input type="text" id="user_name" className="login-inputs" required />
                        <label>Enter Name</label>
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                        <input type="email" id="signup_email" className="login-inputs" required />
                        <label>Email</label>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                        <input type="number" id="signup_email" className="login-inputs" required />
                        <label>Mbbile No.</label>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                        <input type="password" id="signup_password" className="login-inputs" required />
                        <label>Password</label>
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <button className="btn-sign animation" type="submit" style={{ '--i': 21, '--j': 4 }} onClick={(e) => { handlesign(e) }}>Sign up</button>
                    <div className="logreg-link animation" style={{ '--i': 22, '--j': 5 }}>
                        <p>
                            Already have an account? <br />
                            <button type="button" className="register-link" onClick={() => setIsRegister(false)}>
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className="info-text register">
                <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome!</h2>
                <p className="animation" style={{ '--i': 18, '--j': 1 }}>
                    We're delighted to have you here. If you need any assistance, feel free to reach out.
                </p>
            </div>
        </div>
    );
};

export default Login;
