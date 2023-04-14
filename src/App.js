import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
import AdminLoginPage from "./pages/Admin/AdminLoginPage.js";
import EncuestaPage from "./pages/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminInicioPage from "./pages/Admin/AdminInicioPage.js"
import AdminLicPage from "./pages/Admin/AdminLicPage.js";
import AdminCursosPage from "./pages/Admin/AdminCursosPage.js";
import AdminProfesoresPage from "./pages/Admin/AdminProfesoresPage.js";
import {AuthProvider} from "./context/AuthContext.js";

import AdminHomeHeader from './components/Admin/AdminHomeHeader';
import { ModalProvider } from "./context/modalContext";

function App() {
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  const dataModalEncuesta= {
    periodo: "",
    maxMaterias: 4
  }

  return (
    <AuthProvider>
    <BrowserRouter>

      {/*  METER ALGUNA CONDICIONAL SOLO PARA ADMIN */}
      <ModalProvider initialModalData={dataModalEncuesta}>
        <AdminHomeHeader _user={user}/>
      </ModalProvider>

      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="encuesta" element= { <EncuestaPage /> } />

        <Route path="admin" element= { <AdminInicioPage /> } />
        <Route path="admin/login" element= { <AdminLoginPage /> } />
        <Route path="/admin/licenciatura/:claveLic" element= { <AdminLicPage /> } />
        <Route path="/admin/cursos" element= { <AdminCursosPage /> } />
        <Route path="/admin/profesores" element= { <AdminProfesoresPage /> } />

        <Route path="*" element= { <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
