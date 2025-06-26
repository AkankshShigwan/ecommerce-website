import Layout from "../../components/layout";
import Filter from "../../components/womens/filter";
import Products from "../../components/womens/product";

function Womens() {

    const filterData = {
        "filters": [
            {
                "type": "gender",
                "label": "Gender",
                "selected": ["Woman"], // Could be an array for multi-select
                "options": ["Woman", "Man", "Unisex", "Kids"],
                "displayType": "checkbox"
            },
            {
                "type": "category",
                "label": "Category",
                "selected": ["Dresses"],
                "options": [
                    "Tops", "Dresses", "Bottoms", "Outerwear", "Activewear",
                    "Swimwear", "Sleepwear", "Lingerie"
                ],
                "displayType": "checkbox"
            },
            {
                "type": "price",
                "label": "Price Range",
                "selected": null, // Could be { min: 50, max: 100 } for a range
                "options": [
                    { "label": "Under $25", "value": "0-25" },
                    { "label": "$25 - $50", "value": "25-50" },
                    { "label": "$50 - $100", "value": "50-100" },
                    { "label": "$100 - $200", "value": "100-200" },
                    { "label": "Over $200", "value": "200-max" }
                ],
                "displayType": "checkbox" // Or "range-slider" which would need a separate component
            },
            {
                "type": "cuisines", // Example of 'cuisines' filter
                "label": "Cuisines",
                "selected": [],
                "options": ["Chinese", "Italian", "Mexican", "Thai", "Gujarati", "Panjabi", "South Indian"],
                "displayType": "checkbox"
            },
            {
                "type": "brand",
                "label": "Brand",
                "selected": [],
                "options": ["Nike", "Adidas", "Zara", "H&M", "Uniqlo"],
                "displayType": "checkbox"
            }
        ]
    };

    const productsData = [
        { id: 1, imageUrl: 'https://fastly.picsum.photos/id/455/2376/1782.jpg?hmac=XT4Qnk7oQS4-SliSCJLFAt0QpncoYjXFnbiqVwzYZ-E' },
        { id: 2, imageUrl: 'https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4' },
        { id: 3, imageUrl: 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg' },
        { id: 4, imageUrl: 'https://fastly.picsum.photos/id/319/5000/2542.jpg?hmac=icYeEMjMxzLiSh99zhTa7s8rtnSYXjbCtS9nqpVhoEA' },
        { id: 5, imageUrl: 'https://fastly.picsum.photos/id/325/4928/3264.jpg?hmac=D_X6AKqCcH8IpWElX5X3dxx11yn7yYO-vPhiKhzRbwI' },
        { id: 6, imageUrl: 'https://fastly.picsum.photos/id/342/2896/1944.jpg?hmac=_2cYDHi2iG1XY53gvXOrhrEWIP5R5OJlP7ySYYCA0QA' },
        { id: 7, imageUrl: 'https://fastly.picsum.photos/id/442/1909/1262.jpg?hmac=x2Y_bIJcLoz2hP7l1F8uZcrAC0eMggHKccKwVgXW7mM' },
        { id: 8, imageUrl: 'https://fastly.picsum.photos/id/447/1280/853.jpg?hmac=4DUUCOsHRIoYbNrPRYEUHOW7wCjM7TROrTrYFivtdPw' },
        { id: 9, imageUrl: 'https://fastly.picsum.photos/id/455/2376/1782.jpg?hmac=XT4Qnk7oQS4-SliSCJLFAt0QpncoYjXFnbiqVwzYZ-E' },
        // Add more as needed
    ];

    return (
        <>
            <Layout>
                <div className="overlay" style={{ display: "none" }}></div>
                <div className="search-section mt-5">
                    <div className="container-fluid container-xl">
                        <div className="row">
                            <Filter filterData={filterData} />
                            <Products productsData={productsData} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Womens;