import logo from './logo.svg';
import './App.css';
import './common.css';
import './main.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import SignUp from './pages/login/signup';
import ForgetPassword from './pages/login/forgetpassword';
import Dashboard from './pages/main';
import Browser from './pages/categories/browse';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './pages/productDetails';
import Mycart from './pages/mycart';
import Checkout from './pages/checkout';
import Add_product from './pages/admin/addproduct';
import Sucess from './pages/checkout/sucess';
import OrderList from './pages/my_order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/LoginPage' element={<Login />} />
        {/* <Route path='/Signup' element={<SignUp />} /> */}
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/Womens/:id' element={<Browser />} />
        <Route path='/Mens/:id' element={<Browser />} />
        <Route path='/Kids/:id' element={<Browser />} />
        <Route path='/productDetails/:prod_id' element={<ProductDetails />} />
        <Route path='/mycart' element={<Mycart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin/product' element={<Add_product />} />
        <Route path='/order-placed' element={<Sucess />} />
        <Route path='/my-orders' element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
