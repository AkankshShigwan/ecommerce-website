import { useEffect, useState } from "react";
import "./filter.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { base_url, get_product_url } from "../common/endpoints";

function ProductContent(props) {

    const router = useNavigate();

    const [productdtls, Setproductdtls] = useState([]);

    function redirect_details(e, prod_id, cat_id) {
        router(`/productDetails/${prod_id}`);
    }

    console.log('s.cat_id', props.cat_id)

    function getProduct() {
        const payload = {
            "p_auth_key": "",
            "p_product_id": 0,
            "p_pgno": 1,
            "p_pgsz": 3,
            "cat_type": props.cat_id
        };

        console.log("Payload to submit:", payload);

        axios.post(base_url + get_product_url, payload)
            .then((response) => {
                Setproductdtls(response.data.data);

            }).catch((err) => {
            });
    }

    useEffect(() => {
        getProduct();
    }, [])

    console.log('productdtls', productdtls);


    return (
        <div className="content px-4">
            <div className="d-flex justify-content-between border-bottom align-items-center mb-4"> {/* Added mb-4 for spacing */}
                <h2 className="title">Products</h2>
                <div className="filters-actions">
                    <div>
                        <button className="btn filter-btn d-md-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



            <div className="d-flex">
                {productdtls.map(product => (
                    <div className="product-grid mx-2 mb-4" onClick={(e) => { redirect_details(e, product.product_id, props.cat_id) }}>
                        <div className="product-image">
                            <a href="" className="image">
                                <img src={product.product_img1} className="img-fluid pic-1" />
                                <img src={product.product_img2} className="img-fluid pic-2" />
                            </a>
                            <ul className="product-links">
                                <li><a href="" data-tip="Add to Wishlist"><i className="fa fa-heart"></i></a></li>
                                {/* <li><a href="#" data-tip="Compare"><i className="fa fa-random"></i></a></li>
                                <li><a href="#" data-tip="Quick View"><i className="fa fa-eye"></i></a></li> */}
                            </ul>
                            <div className="product-content">
                                <h3 className="title">{product.product_name}</h3>
                                <div className="price">₹ {product.product_price}</div>
                                <ul className="rating">
                                    <li className="fa fa-star"></li>
                                    <li>{product.product_rating}</li>
                                </ul>
                                <a className="add-cart"><i className="fa fa-cart-plus"></i>Add to cart</a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ProductContent;