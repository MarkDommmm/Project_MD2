import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Confirm03 from "./Components/Pages/Confirm03";
import HomePage from "./Components/Pages/HomePage";
import InfoClient from "./Components/Pages/InfoClient";
import ProductPage from "./Components/Pages/ProductPage";
import HeadingPage from "./Components/layout/HeadingPage";
import NavPage from "./Components/layout/NavPage";
import FooterPage from "./Components/layout/FooterPage";
import ProductAdmin from "./Components/Pages/Admin/ProductAdmin";
import Ordermanagement from "./Components/Pages/Admin/Ordermanagement";
import Navbar from "./Components/Pages/Admin/layoutAdmin/Navbar";
import UserManagement from "./Components/Pages/Admin/UserManagement";
import ReportPage from "./Components/Pages/Admin/ReportPage";
import LoginAdmin from "./Components/Pages/Admin/LoginAdmin";
import NOTFOUND from "./Components/Pages/Admin/NOTFOUND";
import Allproduct from "./Components/Pages/Allproduct";

function App() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/order") ||
    location.pathname.startsWith("/usermanagement") ||
    location.pathname.startsWith("/report");

  return (
    <div>
      {!isAdminRoute && (
        <>
          <HeadingPage />
          <NavPage />
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/confirm" element={<Confirm03 />} />
        <Route path="/infoclient" element={<InfoClient />} />
        <Route path="/allproduct" element={<Allproduct />} />

        <Route path="*" element={<NOTFOUND />} />
        {admin === true ? (
          <>
            {/* <Route path="/admin" element={<LoginAdmin />} /> */}
            <Route path="/admin" element={<ProductAdmin />} />
            <Route path="/order" element={<Ordermanagement />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/report" element={<ReportPage />} />
          </>
        ) : null}
      </Routes>
      {!isAdminRoute && (
        <>
          <FooterPage />
        </>
      )}
    </div>
  );
}

export default App;
