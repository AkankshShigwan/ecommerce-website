import React, { useEffect, useRef, useState } from 'react';
import "../../components/product/product.css";
import Layout from '../../components/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { base_url, get_cart_url, get_product_url, save_cart_url } from '../../components/common/endpoints';
import axios from 'axios';
import Swal from 'sweetalert2'
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetail = () => {
    const { prod_id } = useParams();
    const [imgId, setImgId] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState('center center');
    const [productdtls, Setproductdtls] = useState([]);
    const [getproductImages, setProductImages] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [getsize, setSize] = useState('S');

    const imgShowcaseRef = useRef(null);
    const imgDisplayRef = useRef(null);
    const ZOOM_SCALE = 2;
    var chkRem = localStorage.getItem("isLogin");
    const router = useNavigate();
    const userDtls = JSON.parse(localStorage.getItem("userdtls")) || [];

    const handleImageClick = (id) => {
        setImgId(id);
    };

    const slideImage = () => {
        if (imgShowcaseRef.current) {
            const firstImage = imgShowcaseRef.current.querySelector('img:first-child');
            if (firstImage) {
                const displayWidth = firstImage.clientWidth;
                imgShowcaseRef.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
            }
        }
    };

    const handleZoomMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleZoomMouseLeave = () => {
        setIsZoomed(false);
        setZoomOrigin('center center');
    };

    const handleZoomMouseMove = (e) => {
        if (imgDisplayRef.current) {
            const { left, top, width, height } = imgDisplayRef.current.getBoundingClientRect();
            const x = (e.pageX - left) / width;
            const y = (e.pageY - top) / height;
            setZoomOrigin(`${x * 100}% ${y * 100}%`);
        }
    };

    const getActiveImageStyle = (index) => {
        if (isZoomed && (index + 1 === imgId)) {
            return {
                transform: `scale(${ZOOM_SCALE})`,
                transformOrigin: zoomOrigin,
                transition: 'transform 0.2s ease-out',
                cursor: 'crosshair'
            };
        }
        return {
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-out'
        };
    };

    function getProduct() {
        const payload = {
            p_auth_key: "",
            p_product_id: parseInt(prod_id),
            p_pgno: 1,
            p_pgsz: 3,
            cat_type: 0
        };

        axios.post(base_url + get_product_url, payload)
            .then((response) => {
                Setproductdtls(response.data.data);

                let imageId = 1;
                const images = [];
                ["product_img1", "product_img2", "product_img3", "product_img4"].forEach((key) => {
                    if (response.data.data[0][key]) {
                        images.push({
                            alt: imageId++,
                            src: response.data.data[0][key],
                            thumbnailSrc: response.data.data[0][key]
                        });
                    }
                });
                setProductImages(images);
                setProductDetails(JSON.parse(response.data.data[0].product_dtls))
                console.log('response.data.data[0].product_dtls', JSON.parse(response.data.data[0].product_dtls))
            }).catch((err) => {
                console.error(err);
            });
    }

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0) {
            setQuantity(val);
        } else {
            setQuantity(1);
        }
    };

    function handlesize(e) {
        console.log('e', e.target.value)
        setSize(e.target.value);

    }

    function handleCart(e, prod_id) {
        if (chkRem != "true") {
            Swal.fire({
                icon: "warning",
                title: "You need to login first.",
                showCancelButton: true,
                confirmButtonText: "Login",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    router(`/LoginPage`)
                }
            });
            return false;
        }

        const payload = {
            p_auth_key: "",
            p_product_cd: prod_id,
            p_tag: 1,
            p_expected_delivery_date: moment().add(7, 'days').format('DD MMM YYYY'),
            p_size: getsize,
            p_qty: quantity,
            p_delivery_charges: "99",
            p_user_cd: userDtls[0].refcode,
            p_isedit: 0
        };

        axios.post(base_url + save_cart_url, payload)
            .then((response) => {
                console.log('save cart data', response.data.data)
                toast.success(response.data.data[0].msg, {
                    position: "top-center"
                });
                window.location.reload();
            }).catch((err) => {
                console.error(err);
            });
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

            }).catch((err) => {
                console.error(err);
            });
    }


    useEffect(() => {
        getProduct();
        get_Cart();
    }, []);

    useEffect(() => {
        slideImage();
    }, [imgId]);

    useEffect(() => {
        window.addEventListener('resize', slideImage);
        return () => window.removeEventListener('resize', slideImage);
    }, []);

    return (
        <Layout>
            <div className="card-wrapper mt-5">
                {productdtls.map(product => (
                    <div className="card" key={product.product_id}>
                        <div className="product-imgs product_wrapper">
                            <div ref={imgDisplayRef}
                                className="img-display"
                                onMouseEnter={handleZoomMouseEnter}
                                onMouseLeave={handleZoomMouseLeave}
                                onMouseMove={handleZoomMouseMove}>
                                <div className="img-showcase" ref={imgShowcaseRef}>
                                    {getproductImages.map((data, key) => (
                                        <img key={key} src={data.src} alt={data.alt} style={getActiveImageStyle(key)} />
                                    ))}
                                </div>
                            </div>
                            <div className="img-select">
                                {getproductImages.map((data, key) => (
                                    <div className="img-item" key={key}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleImageClick(key + 1); }}>
                                            <img src={data.thumbnailSrc} alt={data.alt} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product-content">
                            <h2 className="product-title">{product.product_name}</h2>
                            <div className="product-rating">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half"></i>
                                <span className='mx-2'>{product.product_rating}</span>
                            </div>

                            <div className="product-price">
                                <p className="new-price">Price: <span>₹ {product.product_price}</span></p>
                            </div>

                            <div className="product-detail">
                                <h2>About this item:</h2>
                                <p>{product.product_desc || 'No description available.'}</p>
                                <ul>
                                    {productDetails.length > 0 &&
                                        Object.entries(productDetails[0]).map(([key, value]) => {
                                            if (typeof value === 'object') {
                                                return Object.entries(value).map(([subKey, subValue]) => (
                                                    <li key={subKey}>{subKey}: <span>{subValue}</span></li>
                                                ));
                                            }
                                            return <li key={key}>{key}: <span>{value}</span></li>;
                                        })
                                    }
                                </ul>
                            </div>
                            <div class="product-dtl">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="size">Size</label>
                                        <select id="size" name="size" class="form-control product-dropdown" onChange={(e) => handlesize(e)}>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="color">Color</label>
                                        <select id="color" name="color" class="form-control product-dropdown">
                                            <option>Blue</option>
                                            <option>Green</option>
                                            <option>Red</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="product-count">
                                    <label for="size">Quantity</label>
                                    <form className="d-flex">
                                        <div className="qtyminus" onClick={handleDecrease} >-</div>
                                        <input type="text" name="quantity" value={quantity} className="qty" onChange={handleChange} style={{ borderRadius: "0px" }} />
                                        <div className="qtyplus" onClick={handleIncrease}>+</div>
                                    </form>
                                </div>
                            </div>
                            <div className="purchase-info">
                                <button type="button" className="btn" onClick={(e) => { handleCart(e, product.product_id) }}>
                                    Add to Cart <i className="fa fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </Layout>
    );
};

export default ProductDetail;
