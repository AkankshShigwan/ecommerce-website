import Layout from "../components/layout";

function Dashboard() {
    return (
        <>
            <Layout />
            <div class="d-flex">
                <div class="category">
                    <div class="circle-bg"></div>
                    <img src="/images/dashboard/womens.png" alt="Womens fashion" class="person-img" />
                    <h2>Womens</h2>
                </div>

                <div class="category">
                    <div class="circle-bg"></div>
                    <img src="/images/dashboard/mens.png" alt="Womens fashion" class="person-img" />
                    <h2>Mens</h2>
                </div>

                <div class="category">
                    <div class="circle-bg"></div>
                    <img src="/images/dashboard/childs.png" alt="Womens fashion" class="person-img" />
                    <h2>Kids</h2>
                </div>

                <div class="category">
                    <div class="circle-bg"></div>
                    <img src="/images/dashboard/accessories.png" alt="Womens fashion" class="person-img" style={{ height: "55%" }} />
                    <h2>Accessiores</h2>
                </div>
            </div>


            <div class="main-content">
                <div class="product-group">
                    <a href="/Womens"><img src="/images/dashboard/cat_womens.png" alt="Womens 1" /></a>
                </div>

                <div class="product-group">
                    <a href="/Mens"><img src="/images/dashboard/cat_mens.png" alt="Mens 1" /></a>
                </div>

                <div class="product-group">
                    <a href="/Kids"><img src="/images/dashboard/cat_kids.png" alt="Kids 1" /></a>
                </div>
            </div>
        </>
    )

}

export default Dashboard