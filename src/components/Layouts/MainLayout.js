import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export const MainLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer/>
    </div>
  );
};
