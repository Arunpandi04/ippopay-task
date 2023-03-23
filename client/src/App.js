import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Component/Signup/Signup';
import Signin from './Component/Signin/Signin';
import Dashboard from './Component/Dashboard/Dashboard';
import OTP from './Component/OTP/OTPScreen';
import { Navigate } from 'react-router-dom';
 
 const PrivateRoute = ({ children}) => {
    const Auth = sessionStorage.getItem("authenticate");
    return Auth === 'true' ? children : <Navigate  to={'/'} replace/>
  }

function App() {
  return (

    <Router>
      <Routes>
        <Route exact strict path="/" element={<Signin />} />
        <Route exact strict path="/signup" element={<Signup />} />
        <Route exact strict path="/otp" element={<PrivateRoute><OTP /></PrivateRoute>} />
        <Route exact strict path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
