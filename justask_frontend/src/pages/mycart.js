import "../style/cart.css";
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../reduxstore/modelslice';
import { useNavigate } from 'react-router-dom';
import { base_url, get_cart_url, save_cart_url } from '../components/common/endpoints';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function MyCart({ }) {

    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const router = useNavigate();

    const userDtls = JSON.parse(localStorage.getItem("userdtls")) || [];

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    console.log('isOpen', isOpen);

    function redrectTocheckout() {
        router('/checkout');
        dispatch(closeModal())
    }

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

    function handleDelete(e, cart_cd) {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to delete this item?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const payload = {
                    p_auth_key: "",
                    p_product_cd: cart_cd,
                    p_tag: 1,
                    p_expected_delivery_date: "",
                    p_size: "getsize",
                    p_qty: 0,
                    p_delivery_charges: "99",
                    p_user_cd: userDtls[0].refcode,
                    p_isedit: 1
                };

                axios.post(base_url + save_cart_url, payload)
                    .then((response) => {
                        console.log('save cart data', response.data.data)
                        toast.success(response.data.data[0].msg, {
                            position: "top-center"
                        });
                        get_Cart();

                    }).catch((err) => {
                        console.error(err);
                    });
            }
        });


    }

    useEffect(() => {
        get_Cart();
    }, []);


    return (
        <>

            <Offcanvas show={isOpen} onHide={() => dispatch(closeModal())} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="vh-100">
                        <div className="d-flex justify-content-between align-items-end mt-3 mb-3">
                            <div className="">
                                <p className="text-black-50">Added Items</p>

                            </div>
                            <div className="">
                                <h5>
                                    <span className="item-in-cart-count">{cartData.length}</span>
                                    <i className="fa fa-shopping-cart" style={{ color: "#fff", fontSize: "1rem" }}></i>
                                </h5>
                            </div>
                        </div>
                        <div id="cart">
                            <div className=" border-0 item-in-cart">
                                {cartData.map((cartdata, key) =>
                                    <div className="">
                                        <div class="card-content">
                                            <div class="cart-card-box">
                                                <img src={cartdata.product_img} alt="" class="card-img" height={100} width={100} />
                                                <div class="detail-box">
                                                    <div class="card-product-title">{cartdata.product_name}</div>
                                                    <div class="card-price">₹ {cartdata.price}</div>
                                                </div>
                                                <i class="fa fa-trash" onClick={(e) => (handleDelete(e, cartdata.cart_cd))}></i></div></div>
                                        <hr />
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="total position-sticky py-3 bg-white" style={{ bottom: "0" }}>
                            <div className="d-flex justify-content-between font-weight-bold px-3">
                                <h4>Total</h4>
                                <h4>₹ <span className="cart-cost-total">{totalPrice}</span></h4>
                            </div>
                        </div>
                        {cartData.length > 0 &&
                            <div className="total position-sticky py-3 bg-white" style={{ bottom: "0" }}>
                                <div className="d-flex justify-content-between font-weight-bold px-3">
                                    <h4></h4>
                                    <button className="btn quantity-plus text-right text-white" onClick={(e) => { redrectTocheckout(e) }}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        }

                    </div>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}

export default MyCart;