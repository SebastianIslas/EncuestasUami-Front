import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
import AdminLoginPage from "./pages/AdminLoginPage.js";
import EncuestaPage from "./pages/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminPage from "./pages/AdminPage.js"
import AdminUeasPage from "./pages/AdminUeasPage.js";
import AdminCursosPage from "./pages/AdminCursosPage.js";
import AdminProfesoresPage from "./pages/AdminProfesoresPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="encuesta" element= { <EncuestaPage /> } />
        <Route path="admin" element= { <AdminPage /> } />
        <Route path="admin/login" element= { <AdminLoginPage /> } />

        <Route path="/admin/licenciatura/:claveLic" element= { <AdminUeasPage /> } />
        <Route path="/admin/cursos" element= { <AdminCursosPage /> } />
        <Route path="/admin/profesores" element= { <AdminProfesoresPage /> } />

        <Route path="*" element= { <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
