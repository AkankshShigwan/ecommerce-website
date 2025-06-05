import "./filter.css";

function ProductContent(props) {

    return (
        <div className="content col-md-9 px-4">
            <div className="d-flex justify-content-between border-bottom align-items-center mb-4"> {/* Added mb-4 for spacing */}
                {/* <h2 className="title">Products</h2> */}
                <div className="filters-actions">
                    <div>
                        <button className="btn filter-btn d-md-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
                            </svg>
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className="row row-grid">
                {props.productsData.map(product => (
                    <div key={product.id} className="col-md-6 col-lg-4 col-xl-4 mb-4">
                        <img src={product.imageUrl} alt={`Product ${product.id}`} className="img-fluid" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductContent;