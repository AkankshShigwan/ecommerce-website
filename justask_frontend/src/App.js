import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/LoginPage' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
