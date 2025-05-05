import logo from './logo.svg';
import './App.css';
import './common.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import SignUp from './pages/login/signup';
import ForgetPassword from './pages/login/forgetpassword';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/LoginPage' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/ForgetPassword' element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
