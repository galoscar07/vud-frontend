import './App.scss';
import {Route, Routes} from "react-router-dom";
import {routes} from "./utils/routes";

// Footer
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import AddProfile from "./pages/AddProfile/AddProfile";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import AdminData from "./pages/AdminData/AdminData";
import AddUnit from "./pages/AddUnit/AddUnit";
import ClinicProfile from "./pages/ClinicProfile/ClinicProfile";
import ThankYou from "./pages/ThankYou/ThankYou";
import DeleteAccount from "./pages/Auth/DeleteAccount/DeleteAccount";
import EmailVerification from "./pages/EmailVerification/EmailVerification";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={routes.HOMEPAGE} element={ <Homepage /> } />
        <Route path={routes.LOGIN} element={ <Login /> } />
        <Route path={routes.REGISTER} element={ <Register /> } />
        <Route path={routes.FORGET_PASSWORD} element={ <ForgetPassword /> } />
        <Route path={routes.ADD_PROFILE} element={ <AddProfile /> } />
        <Route path={routes.ADMIN_DATA} element={ <AdminData /> } />
        <Route path={routes.ADD_UNIT} element={<AddUnit/>}/>
        <Route path={routes.THANK_YOU} element={<ThankYou/>}/>
        <Route path={routes.DELETE_PROFILE} element={<DeleteAccount/>}/>
        <Route path={routes.PROFILE} element={<ClinicProfile/>}/>
        <Route path={routes.EMAIL_VERIFICATION} element={<EmailVerification />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
