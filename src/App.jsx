import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";
import PrivateRoute from "./routes/PrivateRoute";

import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import Category from "./Pages/Dashboard/Category";
import AboutUs from "./Pages/Dashboard/AboutUs";
import FAQ from "./Pages/Dashboard/FAQ";
import Terms from "./Pages/Dashboard/Terms";
import Notification from "./Pages/Dashboard/Notification";
import SellingsDetails from "./Pages/Dashboard/SellingsDetails";
import Products from "./Pages/Dashboard/Products";
import ManageAdmin from "./Pages/Dashboard/ManageAdmin";
import AppSlider from "./Pages/Dashboard/AppSlider";
import SellerTransactions from "./Pages/Dashboard/SellerTransactions";
import BrandLists from "./Pages/Dashboard/BrandLists";
import WorkFunctionalities from "./Pages/Dashboard/WorkFunctionalities";
import SellerLists from "./Pages/Dashboard/SellerLists";
import CustomerLists from "./Pages/Dashboard/CustomerLists";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            // element={
            //   <PrivateRoute>
            //     <Dashboard />
            //   </PrivateRoute>
            // }
            element={<Dashboard />}
          >
            <Route path="/" element={<DashboardHome />} />
            <Route path="/seller-lists" element={<SellerLists />} />
            <Route path="/customer-lists" element={<CustomerLists />} />
            <Route path="/order-details" element={<SellingsDetails />} />
            <Route
              path="/seller-transactions"
              element={<SellerTransactions />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/manage-admin" element={<ManageAdmin />} />
            <Route path="/make-admin" element={<MakeAdmin />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/notification" element={<Notification />} />

            <Route path="/settings/about-us" element={<AboutUs />} />
            <Route path="/settings/faq" element={<FAQ />} />
            <Route path="/settings/app-slider" element={<AppSlider />} />
            <Route path="/settings/brand-list" element={<BrandLists />} />
            <Route path="/settings/addCategory" element={<Category />} />
            <Route
              path="/settings/work-functionalities"
              element={<WorkFunctionalities />}
            />
            <Route path="/settings/terms-conditions" element={<Terms />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
