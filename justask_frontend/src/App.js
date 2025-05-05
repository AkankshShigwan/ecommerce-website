import logo from './logo.svg';
import './App.css';
import './common.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login/index';
import SignUp from './pages/login/signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/LoginPage' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
