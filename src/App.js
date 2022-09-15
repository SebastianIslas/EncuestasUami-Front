import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
import AdminLoginPage from "./pages/AdminLoginPage.js";
import EncuestaPage from "./pages/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminPage from "./pages/AdminPage.js"
import AdminUeasPage1 from "./pages/AdminUeasPage1.js";
import AdminUeasTablaPage from "./pages/AdminUeasTablaPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="encuesta" element= { <EncuestaPage /> } />
        <Route path="admin" element= { <AdminPage /> } />

        {/* <Route path="/admin/ueas1" element= { <AdminUeasPage1 /> } /> */}
        <Route path="/admin/licenciatura/:claveLic" element= { <AdminUeasTablaPage /> } />

        <Route path="*" element= { <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
