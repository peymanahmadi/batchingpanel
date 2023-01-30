import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import "./assets/sass/main.scss";
import { ToastContainer, Slide } from "react-toastify";
import { useAppContext } from "./context/appContext";
import {
  Login,
  Verify,
  ForgotPassword,
  ResetPassword,
  Error,
  Landing,
  ProtectedRoute,
} from "./pages";
import {
  Stats,
  Reports,
  Materials,
  Formulas,
  Warehouses,
  WarehouseOperations,
  WarehouseInventory,
  Users,
  Profile,
  SharedLayout,
} from "./pages/dashboard";

const App = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useAppContext();

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    changeLanguage(i18n.language);
    // i18n.changeLanguage();

    document.title = i18n.t("documentTitle");
  }, [i18n, i18n.language]);

  return (
    <div className={i18n.language === "en-US" ? "english-font" : "farsi-font"}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="reports" element={<Reports />} />
          <Route path="materials" element={<Materials />} />
          <Route path="formulas" element={<Formulas />} />
          <Route path="warehouses" element={<Warehouses />} />
          <Route
            path="warehouses/operations"
            element={<WarehouseOperations />}
          />
          <Route path="warehouses/inventory" element={<WarehouseInventory />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/user/verify-email" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        closeButton={false}
        autoClose={3000}
        hideProgressBar={true}
        transition={Slide}
      />
    </div>
  );
};

export default App;
