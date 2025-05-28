import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout.jsx";
import Adminproduct from "./pages/admin-view/product.jsx";
import Admindashboard from "./pages/admin-view/dashboard.jsx";
import Adminorder from "./pages/admin-view/order.jsx";
import Adminfeatures from "./pages/admin-view/features.jsx";
import Shoppingloyout from "./components/shopping-view/loyout.jsx";
import Notindex from "./pages/not-found/index.jsx";
import Shoppingaccount from "./pages/shopping-view/account.jsx";
import Shoppinglisting from "./pages/shopping-view/listing.jsx";
import Shoppinghome from "./pages/shopping-view/home.jsx";
import Shoppingcheckout from "./pages/shopping-view/checkout.jsx";
import Checkauth from "./components/commmon/check-auth.jsx";
import Unauthpage from "./pages/unauth-age/index.jsx";
import { Toaster } from 'react-hot-toast'
import { useSelector } from "react-redux";
function App() {

  const {isAuthenticated,user} = useSelector(state => state.auth)

  return (
    <div className="flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <Checkauth isAutheticated={isAuthenticated} user={user}>
              <AuthLayout />
            </Checkauth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Checkauth isAutheticated={isAuthenticated} user={user}>
              <AdminLayout />
            </Checkauth>
          }
        >
          <Route path="product" element={<Adminproduct />} />
          <Route path="feature" element={<Adminfeatures />} />
          <Route path="order" element={<Adminorder />} />
          <Route path="dashboard" element={<Admindashboard />} />
        </Route>

        <Route
          path="/Shop"
          element={
            <Checkauth isAutheticated={isAuthenticated} user={user}>
              <Shoppingloyout />
            </Checkauth>
          }
        >
          <Route path="account" element={<Shoppingaccount />} />
          <Route path="listing" element={<Shoppinglisting />} />
          <Route path="home" element={<Shoppinghome />} />
          <Route path="checkout" element={<Shoppingcheckout />} />
        </Route>

        <Route path="*" element={<Notindex />}>
          {" "}
        </Route>
        <Route path="/unauth-page" element={<Unauthpage/>}/>

      </Routes>

          <Toaster/>
    </div>
  );
}

export default App;
