import "../../style/product.css";
import Layout from "../../components/layout";
import { useState } from "react";
import axios from 'axios';
import { base_url, save_product_url } from "../../components/common/endpoints";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_product() {
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const triggerFileInput = () => {
        document.getElementById("imageInput").click();
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const imageURLs = images.map((img) => img.preview); // Replace with actual uploaded URLs if needed

        Swal.fire({
            icon: "warning",
            title: "Do you want to add the product?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    p_product_name: e.target.productName.value,
                    p_product_desc: e.target.description.value,
                    p_prduct_img1: imageURLs[0] || "",
                    p_prduct_img2: imageURLs[1] || "",
                    p_prduct_img3: imageURLs[2] || "",
                    p_prduct_img4: imageURLs[3] || "",
                    p_rating: e.target.rating.value,
                    p_price: e.target.price.value,
                    p_product_dtls: e.target.details.value, // Assume JSON string from a textarea or hidden field
                    p_cat_type: Number(e.target.category.value),
                    p_size: e.target.size.value,
                };

                console.log("Payload to submit:", payload);

                axios.post(base_url + save_product_url, payload)
                    .then((response) => {
                        console.log('product details', response.data.data[0].msg);
                        Swal.fire({
                            icon: "success",
                            title: response.data.data[0].msg,
                        });
                    })
                    .catch((err) => {
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    return (
        <Layout>
            <div className="product_container my-5">
                <h2>🛒 Add New Product</h2>
                <form id="productForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input name="productName" type="text" placeholder="Enter product name" required />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="4" placeholder="Enter product description" required></textarea>
                    </div>

                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input name="price" type="number" placeholder="Enter price" required />
                    </div>

                    <div className="form-group">
                        <label>Rating (1-10)</label>
                        <input name="rating" type="number" min="1" max="10" placeholder="Rating" required />
                    </div>

                    <div className="form-group">
                        <label>Size</label>
                        <input name="size" type="text" placeholder="Product size" />
                    </div>

                    <div className="form-group">
                        <label>Product Details (JSON)</label>
                        <textarea
                            name="details"
                            rows="4"
                            placeholder='Paste product details JSON'
                            required
                            defaultValue={`[{
                            "Display": "Analogue",
                            "Movement": "Mechanical",
                            "Power source": "Battery",
                            "Dial style": "Textured round stainless steel dial",
                            "Features": "Reset Time",
                            "Strap style": "Mauve bracelet style, stainless steel strap with a foldover closure",
                            "Water resistance": "Water Resistant",
                            "Size & Fit": {
                                "Dial width": "35 mm",
                                "Strap width": "18 mm"
                            }
                            }]`}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" required>
                            <option value="">Select category</option>
                            <option value="1">Womens</option>
                            <option value="2">Mens</option>
                            <option value="3">Kids</option>
                            <option value="4">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Upload Product Images (Max 4)</label>
                        <div className="image-upload" onClick={triggerFileInput}>
                            📷 Click or drag to upload images
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                hidden
                                multiple
                                onChange={handleImageChange}
                            />
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem" }}>
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            position: "relative",
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <img
                                            src={img.preview}
                                            alt={`preview-${index}`}
                                            className="preview-img"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "-8px",
                                                right: "-8px",
                                                background: "#ff5c5c",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "50%",
                                                width: "20px",
                                                height: "20px",
                                                cursor: "pointer",
                                                fontSize: "12px",
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn">➕ Add Product</button>
                </form>
            </div>
        </Layout>
    );
}

export default Add_product;
