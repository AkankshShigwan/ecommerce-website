import React, { useEffect, useState } from "react";
import "../../style/OrderList.css"; // use the same CSS you shared
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { base_url, get_Order_url } from "../../components/common/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
    const router = useNavigate();

    const [orderdtls, SetOrderdtls] = useState([]);
    const [activeTab, setActiveTab] = useState("order_tab");
    const [showInvoice, setShowInvoice] = useState(false);

    const handleTabClick = (tab) => setActiveTab(tab);
    const toggleInvoice = () => setShowInvoice((prev) => !prev);

    const userDtls = JSON.parse(localStorage.getItem("userdtls")) || [];


    function getOrders() {
        const payload = {
            "p_auth_key": "",
            "p_user_cd": userDtls[0].refcode
        };

        console.log("Payload to submit:", payload);

        axios.post(base_url + get_Order_url, payload)
            .then((response) => {
                SetOrderdtls(response.data.data);

            }).catch((err) => {
            });
    }

    useEffect(() => {
        getOrders();
    }, [])

    console.log('orderdtls', orderdtls);

    return (
        <div className="container">
            <div className="customer_details orderList">
                <div className="orderTop">
                    <h2 className="hidden-xs">My Orders</h2>
                    <div className="search-container">
                        {/* <form> */}
                        <div className="btn_group">
                            <a href="/"><button className="buy_again">Back to site</button></a>
                        </div>
                        {/* </form> */}
                    </div>
                </div>

                <div className="order_tab">
                    <ul className="tabs">
                        <li className={activeTab === "order_tab" ? "tab-link current" : "tab-link"} onClick={() => handleTabClick("order_tab")}>Orders</li>
                        <li className={activeTab === "buy_again" ? "tab-link current" : "tab-link"} onClick={() => handleTabClick("buy_again")}>Buy Again</li>
                    </ul>
                </div>

                {/* Orders Tab */}
                <div id="order_tab" className={activeTab === "order_tab" ? "orderCardWrap tab-content1 current" : "orderCardWrap tab-content1"}>
                    <div className="orderCard">
                        <div className="orderHead">
                            <ul className="orderLeft">
                                <li>
                                    <p>ORDER PLACED <span>12 March 2019</span></p>
                                </li>
                                <li>
                                    <p>TOTAL <span>$413.00</span></p>
                                </li>
                            </ul>
                            <div className="invoiceDetails">
                                <p>
                                    ORDER # 171-8448362-6456308
                                </p>
                            </div>
                        </div>

                        <div className="itemDetails">
                            <h3>Delivered 16-Mar-2019</h3>
                            <div className="itemInfo">
                                <div className="itemImg">
                                    <img src="images/product1.jpg" alt="" />
                                </div>
                                <div className="itemDesc">
                                    <h4>Pigeon Stainless Steel Swig Water Bottle 750ml (Set of 2)</h4>
                                    <p>Sold by: <span>E-Emporium</span></p>
                                    <span className="itemPrice">$413.00</span>
                                    <button className="buy_again">Buy it again</button>
                                </div>
                            </div>
                            <div className="btn_group">
                                <button className="buy_again">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buy Again Tab */}
                <div id="buy_again" className={activeTab === "buy_again" ? "orderCardWrap tab-content1 current" : "orderCardWrap tab-content1"}>
                    <div className="again">
                        <h2>Frequently repurchased in Health & Personal Care</h2>
                        <ul>
                            {Array(4).fill().map((_, i) => (
                                <li key={i}>
                                    <img src="images/product1.jpg" alt="" />
                                    <h4>Pigeon Stainless Steel Swig Water Bottle 750ml (Set of 2)</h4>
                                    <span>$413.00</span>
                                    <button className="buy_again">Add to Cart</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Open Orders */}
                <div id="open_orders" className={activeTab === "open_orders" ? "orderCardWrap tab-content1 current" : "orderCardWrap tab-content1"}>
                    <p>Lorem1</p>
                </div>

                {/* Cancelled Orders */}
                <div id="cancelled_orders" className={activeTab === "cancelled_orders" ? "orderCardWrap tab-content1 current" : "orderCardWrap tab-content1"}>
                    <div className="orderCard">
                        <div className="orderHead">
                            <ul className="orderLeft">
                                <li><p>ORDER PLACED <span>12 March 2019</span></p></li>
                                <li><p>TOTAL <span>$413.00</span></p></li>
                                <li>
                                    <p>SHIP TO <span className="customerName">Customer Name</span>
                                        <span className="cstmrInfo">
                                            <strong>Customer Name</strong> Lorem Ipsum is simply dummy text
                                        </span>
                                    </p>
                                </li>
                            </ul>
                            <div className="invoiceDetails">
                                <p>ORDER # 171-8448362-6456308</p>
                            </div>
                        </div>

                        <div className="itemDetails">
                            <h3>Delivered 16-Mar-2019</h3>
                            <p>Package was handed to a receptionist</p>
                            <p>Signed by: Priti.</p>
                            <div className="itemInfo">
                                <div className="itemImg">
                                    <img src="images/product1.jpg" alt="" />
                                </div>
                                <div className="itemDesc">
                                    <h4>Pigeon Stainless Steel Swig Water Bottle 750ml (Set of 2)</h4>
                                    <p>Sold by: <span>E-Emporium</span></p>
                                    <span className="itemPrice">$0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
