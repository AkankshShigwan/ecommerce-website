import { useEffect, useState } from 'react';
import '../../checkout.css';
import Layout from '../../components/layout';
import { base_url, edit_profile_url, get_cart_url, saveOrder_url } from '../../components/common/endpoints';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout(params) {

    const router = useNavigate();

    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);


    // const router = useNavigate();

    const userDtls = JSON.parse(localStorage.getItem("userdtls")) || [];
    const Username = localStorage.getItem("username");

    function get_Cart() {
        const payload = {
            p_auth_key: "",
            p_pgno: 1,
            p_pgsz: 3,
            p_user_cd: userDtls[0].refcode
        };

        axios.post(base_url + get_cart_url, payload)
            .then((response) => {
                console.log('cart data', response.data.data)
                setTotalPrice(response.data.data.reduce((sum, item) => sum + Number(item.price), 0));
                setCartData(response.data.data);

            }).catch((err) => {
                console.error(err);
            });
    }

    function save_profile_details(e) {
        e.preventDefault()
        const payload = {
            p_auth_key: "",
            p_user_cd: userDtls[0].refcode,
            p_address1: document.getElementById('checkout-address').value,
            p_address2: "",
            p_pincode: document.getElementById('checkout-pincode').value,
            p_state: document.getElementById('checkout-state').value,
            p_country: document.getElementById('checkout-country').value,
            p_save_tag: document.getElementById("checkout-checkbox").checked == true ? 1 : 0
        };

        axios.post(base_url + edit_profile_url, payload)
            .then((response) => {
                console.log('save address data', response.data.data);
                cartData.forEach(item => { save_order(item.cart_cd) })

            }).catch((err) => {
                console.error(err);
            });
    }

    function save_order(cart_cd) {
        const payload = {
            p_auth_key: "",
            p_cart_cd: cart_cd,
            p_qty: "",
            p_size: "",
            p_paided_tag: 1,
            p_isedit: 0,
            p_user_cd: userDtls[0].refcode,
            p_save_tag: document.getElementById("checkout-checkbox").checked == true ? 1 : 0
        };

        axios.post(base_url + saveOrder_url, payload)
            .then((response) => {
                console.log('save address data', response.data.data)
                if (response.data.data[0].Status == 1) {
                    router('/order-placed');
                }
            }).catch((err) => {
                console.error(err);
            });
    }


    useEffect(() => {
        get_Cart();
    }, []);

    return (
        <>
            <Layout>
                <header className='text-center mt-3'>
                    <h3>Checkout</h3>
                </header>
                <div className='card-wrapper'>

                    <main>

                        <section className="checkout-form">
                            <form action="#!" method="get">
                                <h6>Shipping address</h6>
                                <div className="form-control">
                                    <label for="checkout-name">Full name</label>
                                    <div>
                                        <span className="fa fa-user-circle"></span>
                                        <input type="text" id="checkout-name" name="checkout-name" value={Username} placeholder="Enter you name..." disabled />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label for="checkout-address">Address</label>
                                    <div>
                                        <span className="fa fa-home"></span>
                                        <input type="text" name="checkout-address" id="checkout-address" placeholder="Your address..." />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label for="checkout-state">State</label>
                                    <div>
                                        <span className="fa fa-building"></span>
                                        <input type="text" name="checkout-state" id="checkout-state" placeholder="Your state..." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-control">
                                        <label for="checkout-country">Country</label>
                                        <div>
                                            <span className="fa fa-globe"></span>
                                            <input type="text" name="checkout-country" id="checkout-country" placeholder="Your country..." list="country-list" />
                                            <datalist id="country-list">
                                                <option value="India"></option>
                                                <option value="USA"></option>
                                                <option value="Russia"></option>
                                                <option value="Japan"></option>
                                                <option value="Egypt"></option>
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label for="checkout-pincode">Postal code</label>
                                        <div>
                                            <span className="fa fa-archive"></span>
                                            <input type="number" name="checkout-pincode" id="checkout-pincode" placeholder="Your postal code..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control checkbox-control">
                                    <input type="checkbox" name="checkout-checkbox" id="checkout-checkbox" />
                                    <label for="checkout-checkbox">Save this information for next time</label>
                                </div>
                                <div className="form-control-btn">
                                    <button onClick={(e) => save_profile_details(e)}>Continue</button>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-details">
                            <div className="checkout-details-inner">
                                <div className="checkout-lists">
                                    {cartData.map((cartdata, key) =>
                                        <div className="checkout-card">
                                            <div className="checkout-card-image"><img src={cartdata.product_img} alt="" /></div>
                                            <div className="checkout-card-details">
                                                <div className="checkout-card-name">{cartdata.product_name}</div>
                                                <div className="checkout-card-price">₹ {cartdata.price}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="checkout-shipping">
                                    <h6>Shipping</h6>
                                    <p>₹ 99</p>
                                </div>
                                <div className="checkout-total">
                                    <h6>Total</h6>
                                    <p>₹ {totalPrice}</p>
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
            </Layout>
        </>
    )
}

export default Checkout;