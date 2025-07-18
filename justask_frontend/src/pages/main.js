import Layout from "../components/layout";
import Carousel from 'react-bootstrap/Carousel';

function Dashboard() {
    return (
        <>
            <Layout>
                <div className="d-flex">
                    <div className="category">
                        <div className="circle-bg"></div>
                        <a href="/womens/1">
                            <img src="/images/dashboard/womens.png" alt="Womens fashion" className="person-img" />
                        </a>
                        <h2>Womens</h2>
                    </div>

                    <div className="category">
                        <div className="circle-bg"></div>
                        <a href="/mens/2">
                            <img src="/images/dashboard/mens.png" alt="Womens fashion" className="person-img" />
                        </a>
                        <h2>Mens</h2>
                    </div>

                    <div className="category">
                        <div className="circle-bg"></div>
                        <a href="/Kids/3">
                            <img src="/images/dashboard/childs.png" alt="Womens fashion" className="person-img" />
                        </a>
                        <h2>Kids</h2>
                    </div>

                    <div className="category">
                        <div className="circle-bg"></div>
                        <a href="/Kids/3">
                            <img src="/images/dashboard/accessories.png" alt="Womens fashion" className="person-img" style={{ height: "55%", width: "50%" }} />
                        </a>
                        <h2>Accessiores</h2>
                    </div>
                </div>

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ytimg.com/vi/U5Q3Du2W9a0/maxresdefault.jpg"
                            alt="First slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.venngage.com/template/thumbnail/full/79d5051d-11fa-4e0d-af4c-adeda6acab91.webp"
                            alt="Second slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://static.vecteezy.com/system/resources/thumbnails/023/952/688/small_2x/advertising-sale-banner-design-with-discount-offer-and-fashionable-woman-holding-shopping-bag-on-grey-striped-background-for-special-offer-vector.jpg"
                            alt="Third slide"
                            style={{ height: '600px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                </Carousel>


                <div className="main-content">
                    <div className="product-group">
                        <a href="/Womens/1"><img src="/images/dashboard/cat_womens.png" alt="Womens 1" /></a>
                    </div>

                    <div className="product-group">
                        <a href="/Mens/2"><img src="/images/dashboard/cat_mens.png" alt="Mens 1" /></a>
                    </div>

                    <div className="product-group">
                        <a href="/Kids/3"><img src="/images/dashboard/cat_kids.png" alt="Kids 1" /></a>
                    </div>
                </div>
            </Layout>
        </>
    )

}

export default Dashboard