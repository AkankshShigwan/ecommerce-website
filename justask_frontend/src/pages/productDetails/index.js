import React, { useEffect, useRef, useState } from 'react';
import "../../components/product/product.css";
import Layout from '../../components/layout';

const ProductDetail = () => {
    const productImages = [
        { src: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg", alt: "shoe image 1", thumbnailSrc: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg" },
        { src: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg", alt: "shoe image 2", thumbnailSrc: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" },
        { src: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg", alt: "shoe image 3", thumbnailSrc: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" },
        { src: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg", alt: "shoe image 4", thumbnailSrc: "https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" },
    ];

    // State to keep track of the currently displayed image ID for the slider
    const [imgId, setImgId] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState('center center');

    const imgShowcaseRef = useRef(null);
    const imgDisplayRef = useRef(null);
    const ZOOM_SCALE = 2;

    // Function to handle image click
    const handleImageClick = (id) => {
        setImgId(id);
    };

    // Function to slide the image
    const slideImage = () => {
        if (imgShowcaseRef.current) {
            const firstImage = imgShowcaseRef.current.querySelector('img:first-child');
            if (firstImage) {
                const displayWidth = firstImage.clientWidth;
                imgShowcaseRef.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
            }
        }
    };

    // Event handler for when the mouse enters the image display area
    const handleZoomMouseEnter = () => {
        setIsZoomed(true);
    };

    // Event handler for when the mouse leaves the image display area
    const handleZoomMouseLeave = () => {
        setIsZoomed(false);
        setZoomOrigin('center center');
    };

    // Event handler for when the mouse moves over the image display area
    const handleZoomMouseMove = (e) => {
        if (imgDisplayRef.current) {
            const { left, top, width, height } = imgDisplayRef.current.getBoundingClientRect();
            const x = (e.pageX - left) / width;
            const y = (e.pageY - top) / height;
            setZoomOrigin(`${x * 100}% ${y * 100}%`);
        }
    };

    // Function to generate inline style for the active image for zoom effect
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

    useEffect(() => {
        slideImage();
    }, [imgId]);

    useEffect(() => {
        window.addEventListener('resize', slideImage);

        return () => {
            window.removeEventListener('resize', slideImage);
        };
    }, []);

    return (
        <Layout>
            <div className="card-wrapper">
                <div className="card">
                    <div className="product-imgs">
                        <div ref={imgDisplayRef}
                            className="img-display w-full h-96 overflow-hidden relative rounded-lg border border-gray-200"
                            onMouseEnter={handleZoomMouseEnter}
                            onMouseLeave={handleZoomMouseLeave}
                            onMouseMove={handleZoomMouseMove} >
                            <div className="img-showcase" ref={imgShowcaseRef}>
                                {productImages.map((data, key) => (
                                    <img key={key} src={data.src} alt={data.alt} style={getActiveImageStyle(key)} />
                                ))}
                            </div>
                        </div>
                        <div className="img-select">
                            {productImages.map((data, key) => (
                                <div className="img-item" key={key}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleImageClick(key + 1); }}>
                                        <img src={data.thumbnailSrc} alt={data.alt} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product-content">
                        <h2 className="product-title">nike shoes</h2>
                        <div className="product-rating">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half"></i>
                            <span className='mx-2'>4.7(21)</span>
                        </div>

                        <div className="product-price">
                            <p className="last-price">Old Price: <span>$257.00</span></p>
                            <p className="new-price">New Price: <span>$249.00 (5%)</span></p>
                        </div>

                        <div className="product-detail">
                            <h2>about this item: </h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                            <ul>
                                <li>Color: <span>Black</span></li>
                                <li>Available: <span>in stock</span></li>
                                <li>Category: <span>Shoes</span></li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div className="purchase-info">
                            <input type="number" min="0" defaultValue="1" />
                            <button type="button" className="btn">
                                Add to Cart <i className="fa fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;