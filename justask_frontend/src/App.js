import logo from './logo.svg';
import './App.css';
import './common.css';
import './main.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import SignUp from './pages/login/signup';
import ForgetPassword from './pages/login/forgetpassword';
import Dashboard from './pages/main';
import Womens from './pages/categories/womens';
import Mens from './pages/categories/mens';
import Kids from './pages/categories/kids';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './pages/productDetails';
import Mycart from './pages/mycart';
import Checkout from './pages/checkout';
import Add_product from './pages/admin/addproduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/LoginPage' element={<Login />} />
        {/* <Route path='/Signup' element={<SignUp />} /> */}
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
        <Route path='/Womens' element={<Womens />} />
        <Route path='/Mens' element={<Mens />} />
        <Route path='/Kids' element={<Kids />} />
        <Route path='/productDetails' element={<ProductDetails />} />
        <Route path='/mycart' element={<Mycart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin/product' element={<Add_product />} />
      </Routes>
    </Router>
  );
}

export default App;
