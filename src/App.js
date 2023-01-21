import './App.scss';
import {Route, Routes} from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// Footer
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminData from "./pages/AdminData/AdminData";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="admin-data" element={ <AdminData /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
