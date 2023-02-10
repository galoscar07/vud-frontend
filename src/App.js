import './App.scss';
import {Route, Routes} from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// Footer
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddProfile from "./pages/AddProfile/AddProfile";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminData from "./pages/AdminData/AdminData";
import AddUnit from "./pages/AddUnit/AddUnit";
import ThankYou from "./pages/ThankYou/ThankYou";

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
        <Route path="medical-unit" element={<AddUnit/>}/>
        <Route path="thank-you" element={<ThankYou/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
