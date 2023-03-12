import './App.scss';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { routes } from "./utils/routes";

// Footer
import Header from "./components/Header/Header";

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
import { MainLayout } from './components/Layouts/MainLayout';
import { AuthLayout } from './components/Layouts/AuthLayout';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import ClinicPage from './pages/ClinicPage/ClinicPage';
import FilterPage from './pages/Homepage/FilterPage/FilterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardAdminData from './pages/Dashboard/AdminData/DashboardAdminData';
import DashboardProfileData from './pages/Dashboard/ProfileData/DashboardProfileData';
import DashboardUnitData from './pages/Dashboard/UnitData/DashboardUnitData';
import LogOut from './pages/Dashboard/LogOut/LogOut';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* TODO some of this don't make sense to be in auth layout. */}
        <Route element={<AuthLayout />}>
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.REGISTER} element={<Register />} />
          <Route path={routes.FORGET_PASSWORD} element={<ForgetPassword />} />
          <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={routes.ADD_PROFILE} element={<AddProfile />} />
          <Route path={routes.ADMIN_DATA} element={<AdminData />} />
          <Route path={routes.ADD_UNIT} element={<AddUnit />} />
          <Route path={routes.THANK_YOU} element={<ThankYou />} />
          <Route path={routes.DELETE_PROFILE} element={<DeleteAccount />} />
          <Route path={routes.PROFILE} element={<ClinicProfile />} />
          <Route path={routes.EMAIL_VERIFICATION} element={<EmailVerification />} />
          <Route path={routes.DASHBOARD} element={<Dashboard />} >
            <Route path={routes.DASHBOARD} element={<Navigate to={routes.DASHBOARD_UNIT_DATA} replace />} />
            <Route path={routes.DASHBOARD_UNIT_DATA} element={<DashboardUnitData />} />
            <Route path={routes.DASHBOARD_PROFILE_DATA} element={<DashboardProfileData />} />
            <Route path={routes.DASHBOARD_ADMIN_DATA} element={<DashboardAdminData />} />
          </Route>
          <Route path={routes.LOG_OUT} element={<LogOut />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path={routes.HOMEPAGE} element={<Homepage />} />
          <Route path={routes.FILTER_PAGE} element={<FilterPage />} />
          <Route path={routes.CLINIC_PAGE} element={<ClinicPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
