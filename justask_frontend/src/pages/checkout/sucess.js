import { useEffect, useState } from 'react';
import '../../style/success.css';
import Layout from '../../components/layout';
import { useNavigate } from 'react-router-dom';

function Success(params) {

    const router = useNavigate();

    const [randomNum, setRandomNum] = useState(null);

    const generateFourDigitNumber = () => {
        const num = Math.floor(1000 + Math.random() * 9000);
        setRandomNum(num);
    };

    function redirectTomain(params) {
        router(`/`);
    }

    useEffect(() => {
        generateFourDigitNumber();
    }, []);

    return (
        <>
            <Layout>
                <div >
                    <div class="container">

                        <div class="row">
                            <div class="col-12 ">
                                <div class="message-box">
                                    <div class="success-container">

                                        <br />
                                        <img src="https://scontent-lcy1-1.xx.fbcdn.net/v/t1.6435-9/31301640_2114242505489348_3921532491046846464_n.png?_nc_cat=104&ccb=1-3&_nc_sid=973b4a&_nc_ohc=pfOalMq8BzUAX-k-rhY&_nc_ht=scontent-lcy1-1.xx&oh=3af014dd12fa6e3d1816a3425a80e516&oe=609BE04A" alt="" style={{ height: "100px;" }} />
                                        <br />
                                        <br />
                                        <h1 class="monserrat-font" style={{ color: "Grey" }}>Thank you for your order</h1>
                                        <br />

                                        <div class="confirm-green-box">
                                            <br />
                                            <h5>ORDER CONFIRMATION</h5>
                                            <p>Your order #{randomNum} has been sucessful!</p>
                                            <p>Thank you for choosing justAsk. You will shortly receive a confirmation email.</p>
                                        </div>

                                        <br />
                                        <button id="create-btn" class="btn btn-ouioui-secondary margin-left-5px my-5" onClick={(e) => redirectTomain()}>Back to shop</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Success;