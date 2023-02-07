import './App.scss';
import {Route, Routes} from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Footer
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProfile from "./pages/AddProfile";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
<<<<<<< HEAD
        <Route path="forget-password" element={ <ForgetPassword /> } />
        <Route path="add-profile" element={ <AddProfile /> } />
=======
        <Route path="admin-data" element={ <AdminData /> } />
>>>>>>> temp
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
