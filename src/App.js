import {useContext, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
import AdminLoginPage from "./pages/AdminLoginPage.js";
import EncuestaPage from "./pages/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminInicioPage from "./pages/Admin/AdminInicioPage.js"
import AdminLicPage from "./pages/Admin/AdminLicPage.js";
import AdminCursosPage from "./pages/Admin/AdminCursosPage.js";
import AdminProfesoresPage from "./pages/Admin/AdminProfesoresPage.js";
import ProtectedRoute from './components/common/ProtectedRoute.js'
import {AuthContext} from "./context/AuthContext.js";

function App() {
  

  const {verifyAuth} = useContext(AuthContext)
  useEffect(() => {verifyAuth()}, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="encuesta" element= { <EncuestaPage /> } />
        <Route path="admin/login" element= { <AdminLoginPage /> } />
        <Route path="admin" element= { <ProtectedRoute /> } > 
          <Route index element= {<AdminInicioPage /> } />
          <Route path="licenciatura/:claveLic" element= { <AdminLicPage /> } />
          <Route path="cursos" element= { <AdminCursosPage /> } />
          <Route path="profesores" element= { <AdminProfesoresPage /> } />
        </Route>
        <Route path="*" element= { <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
