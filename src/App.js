import {useContext, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Alumno/HomePage.js"
import LoginPage from "./pages/Alumno/LoginPage.js";
import AdminLoginPage from "./pages/Admin/AdminLoginPage.js";
import EncuestaPage from "./pages/Alumno/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminInicioPage from "./pages/Admin/AdminInicioPage.js"
import AdminLicPage from "./pages/Admin/AdminLicPage.js";
import AdminCursosPage from "./pages/Admin/AdminCursosPage.js";
import AdminProfesoresPage from "./pages/Admin/AdminProfesoresPage.js";
import ProtectedRoute from './components/common/ProtectedRoute.js'
import {AuthContext} from "./context/AuthContext.js";

import AdminHomeHeader from './components/Admin/AdminHomeHeader';
import { ModalProvider } from "./context/modalContext";

function App() {

  const dataModalEncuesta= {
    periodo: "",
    maxMaterias: 4
  }
  

  const {verifyAuth, user} = useContext(AuthContext)
  useEffect(() => {verifyAuth()}, [])
  console.log("user", user);
  return (
    <BrowserRouter>

      {/*  METER ALGUNA CONDICIONAL SOLO PARA ADMIN */}
      {user.authToken == 'admin' ? 
      <ModalProvider initialModalData={dataModalEncuesta}>
        <AdminHomeHeader />
        {/* <AdminHomeHeader _user={user}/> */}
      </ModalProvider>
      : null
      }

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
