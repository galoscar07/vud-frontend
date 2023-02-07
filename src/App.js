import './App.scss';
import {Route, Routes} from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Footer
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddProfile from "./pages/AddProfile";
import ForgetPassword from "./pages/ForgetPassword";import AdminData from "./pages/AdminData/AdminData";
import AdminData from "./pages/AdminData/AdminData";
import ForgetPassword from "./pages/ForgetPassword";
import AdminData from "./pages/AdminData";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="forget-password" element={ <ForgetPassword /> } />
        <Route path="add-profile" element={ <AddProfile /> } />
        <Route path="admin-data" element={ <AdminData /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
