import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../reduxstore/modelslice';
import { useNavigate } from 'react-router-dom';

function MyCart({ }) {

    const router = useNavigate();

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    console.log('isOpen', isOpen);

    function redrectTocheckout() {
        router('/checkout');
        dispatch(closeModal())
    }


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
                                <small className="text-black-50">Added Items</small>

                            </div>
                            <div className="">
                                <h4>
                                    <span className="item-in-cart-count">0</span>
                                    <i className="fa fa-shopping-cart" style={{ color: "#fff", fontSize: "1rem" }}></i>
                                </h4>
                            </div>
                        </div>
                        <div id="cart">
                            <div className=" border-0 item-in-cart">
                                <div className="">
                                    <div className="d-flex justify-content-between align-items-end">
                                        <img src="https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4" className="img-in-cart" alt="" />
                                        <button className="btn remove-from-cart">
                                            <i className="fa fa-trash" style={{ color: "#fff", fontSize: "1rem" }}></i>
                                        </button>
                                    </div>
                                    <p className="mt-3">
                                        BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats
                                    </p>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <div className="d-flex col-8">
                                            <button className="btn quantity-minus">
                                                <i className="fa fa-minus" style={{ color: "#fff", fontSize: "1rem" }}></i>
                                            </button>
                                            <input type="number" className="form-control w-25 mx-2 quantity" value="1" min="1" />
                                            <button className="btn quantity-plus">
                                                <i className="fa fa-plus" style={{ color: "#fff", fontSize: "1rem" }}></i>
                                            </button>
                                        </div>
                                        <p className="col-4 mb-0 text-end">$ <span className="item-in-cart-cost">1900</span></p>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="total position-sticky py-3 bg-white" style={{ bottom: "0" }}>
                            <div className="d-flex justify-content-between font-weight-bold px-3">
                                <h4>Total</h4>
                                <h4>$ <span className="cart-cost-total">{Number(12355).toFixed(2)}</span></h4>
                            </div>
                        </div>
                        <div className="total position-sticky py-3 bg-white" style={{ bottom: "0" }}>
                            <div className="d-flex justify-content-between font-weight-bold px-3">
                                <h4></h4>
                                <button className="btn quantity-plus text-right text-white" onClick={(e) => { redrectTocheckout(e) }}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}

export default MyCart;