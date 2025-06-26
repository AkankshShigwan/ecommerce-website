import '../../checkout.css';
import Layout from '../../components/layout';

function Checkout(params) {
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
                                        <input type="text" id="checkout-name" name="checkout-name" placeholder="Enter you name..." />
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
                                    <label for="checkout-city">City</label>
                                    <div>
                                        <span className="fa fa-building"></span>
                                        <input type="text" name="checkout-city" id="checkout-city" placeholder="Your city..." />
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
                                        <label for="checkout-postal">Postal code</label>
                                        <div>
                                            <span className="fa fa-archive"></span>
                                            <input type="numeric" name="checkout-postal" id="checkout-postal" placeholder="Your postal code..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control checkbox-control">
                                    <input type="checkbox" name="checkout-checkbox" id="checkout-checkbox" />
                                    <label for="checkout-checkbox">Save this information for next time</label>
                                </div>
                                <div className="form-control-btn">
                                    <button>Continue</button>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-details">
                            <div className="checkout-details-inner">
                                <div className="checkout-lists">
                                    <div className="checkout-card">
                                        <div className="checkout-card-image"><img src="https://rvs-checkout-page.onrender.com/photo1.png" alt="" /></div>
                                        <div className="checkout-card-details">
                                            <div className="checkout-card-name">Vintage Backbag</div>
                                            <div className="checkout-card-price">$54.99 <span>$94.99</span></div>
                                            <div className="checkout-card-wheel">
                                                <button>-</button>
                                                <span>1</span>
                                                <button>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout-card">
                                        <div className="checkout-card-image"><img src="https://rvs-checkout-page.onrender.com/photo2.png" alt="" /></div>
                                        <div className="checkout-card-details">
                                            <div className="checkout-card-name">Levi Shoes</div>
                                            <div className="checkout-card-price">$74.99 <span>$124.99</span></div>
                                            <div className="checkout-card-wheel">
                                                <button>-</button>
                                                <span>1</span>
                                                <button>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-shipping">
                                    <h6>Shipping</h6>
                                    <p>$19</p>
                                </div>
                                <div className="checkout-total">
                                    <h6>Total</h6>
                                    <p>$148.98</p>
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