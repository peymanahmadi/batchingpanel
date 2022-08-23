import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/sass/main.scss";
import { Login, Error, Landing, ProtectedRoute } from "./pages";
import {
  Stats,
  Reports,
  Materials,
  Formulas,
  Warehouses,
  Users,
  Profile,
  SharedLayout,
} from "./pages/dashboard";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;

    document.title = i18n.t("documentTitle");
  }, [i18n, i18n.language]);

  return (
    <BrowserRouter>
      <div className={i18n.language === "en" ? "english-font" : "farsi-font"}>
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
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
