import "../../style/product.css";
import Layout from "../../components/layout";
import { useState } from "react";
import axios from 'axios';
import { base_url, save_product_url, uploadProduct_img } from "../../components/common/endpoints";
import Swal from 'sweetalert2'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_product() {

    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [upload, setupload] = useState([]);

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length + images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        const newImages = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
        setFiles((prev) => [...prev, ...selectedFiles]); // Store files separately
    };

    console.log('images', images);

    const triggerFileInput = () => {
        document.getElementById("imageInput").click();
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const uploadImages = async (files) => {
        const uploaded = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await axios.post(base_url + uploadProduct_img, formData);
                console.log('res', res.data.url)
                uploaded.push({
                    url: res.data.url, // adjust based on your API response
                    name: file.name,
                });
            } catch (err) {
                console.error("Upload failed for", file.name, err);
            }
        }

        return uploaded;
    };

    console.log('upload', upload);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productresult = details
            .filter(item => item.key.trim())
            .map(item => ({ [item.key]: item.value }));

        console.log('Final JSON:', productresult);

        Swal.fire({
            icon: "warning",
            title: "Do you want to add the product?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const uploaded = await uploadImages(files);
                console.log('uploaded', uploaded);

                const payload = {
                    p_product_name: e.target.productName.value,
                    p_product_desc: e.target.description.value,
                    p_prduct_img1: uploaded[0]?.url || "",
                    p_prduct_img2: uploaded[1]?.url || "",
                    p_prduct_img3: uploaded[2]?.url || "",
                    p_prduct_img4: uploaded[3]?.url || "",
                    p_rating: e.target.rating.value,
                    p_price: e.target.price.value,
                    p_product_dtls: JSON.stringify(productresult), // Assume JSON string from a textarea or hidden field
                    p_cat_type: Number(e.target.category.value),
                    p_size: JSON.stringify(selectedSizes),
                };

                console.log("Payload to submit:", payload);

                axios.post(base_url + save_product_url, payload)
                    .then((response) => {
                        console.log('product details', response.data.data[0].msg);
                        Swal.fire({
                            icon: "success",
                            title: response.data.data[0].msg,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((err) => {
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const [details, setDetails] = useState([
        { key: '', value: '' }
    ]);

    const handleChange = (index, field, value) => {
        const updated = [...details];
        updated[index][field] = value;
        setDetails(updated);
    };

    const addField = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const removeField = (index) => {
        const updated = details.filter((_, i) => i !== index);
        setDetails(updated);
    };

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSizes([...selectedSizes, value]);
        } else {
            setSelectedSizes(selectedSizes.filter((size) => size !== value));
        }
    };

    console.log('selectedSizes', selectedSizes);

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
                        <div className="checkbox-group d-flex">
                            {sizes.map((size) => (
                                <label key={size} style={{ marginRight: "10px" }}>
                                    <input
                                        type="checkbox"
                                        value={size}
                                        checked={selectedSizes.includes(size)}
                                        onChange={handleCheckboxChange}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    <label>Product Details</label>

                    {details.map((item, index) => (
                        <div key={index} className="d-flex my-2">
                            <input
                                type="text"
                                placeholder="Product Detail"
                                value={item.key}
                                onChange={(e) => handleChange(index, 'key', e.target.value)}
                                className="border px-2 py-1 rounded mx-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={item.value}
                                onChange={(e) => handleChange(index, 'value', e.target.value)}
                                className="border px-2 py-1 rounded mx-2"
                                required
                            />
                            <button type="button" onClick={() => removeField(index)} className="cross-btn">×</button>
                        </div>
                    ))}

                    <button type="button" onClick={addField} className="addmore_btn">
                        + Add More
                    </button>

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
            <ToastContainer />
        </Layout>
    );
}

export default Add_product;
