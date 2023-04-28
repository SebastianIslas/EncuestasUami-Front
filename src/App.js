import {useContext, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/Alumno/LoginPage.js";
import SignInPage from "./pages/Alumno/SignInPage.js";
import AdminLoginPage from "./pages/Admin/AdminLoginPage.js";
import EncuestaPage from "./pages/Alumno/EncuestaPage.js";
import EstadisticasPage from "./pages/Estadisticas/EstadisticasPage.js";
import EstadisticasDetallesPage from "./pages/Estadisticas/EstadisticasDetallesPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminInicioPage from "./pages/Admin/AdminInicioPage.js"
import AdminLicPage from "./pages/Admin/AdminLicPage.js";
import AdminCursosPage from "./pages/Admin/AdminCursosPage.js";
import AdminProfesoresPage from "./pages/Admin/AdminProfesoresPage.js";
import ProtectedRoute from './components/common/ProtectedRoute.js'
import {AuthContext} from "./context/AuthContext.js";
import HomeHeader from "./components/HomeHeader";
import {AuthContextAlumnos} from "./context/AuthContextAlumnos.js";

import AdminHomeHeader from './components/Admin/AdminHomeHeader';
import { ModalProvider } from "./context/modalContext";
import ProtectedRouteAlumnos from "./components/common/ProtectedRouteAlumnos.js";

function App() {

  const dataModalEncuesta= {
    periodo: "",
    maxMaterias: 4
  }
  

  const {verifyAuth, user} = useContext(AuthContext)
  const {verifyAuth: verifyAuthAlumnos, user: alumno} = useContext(AuthContextAlumnos)

  {/* Vefircacion al cargar o ingresar a la pagina directamente*/}
  useEffect(() => {verifyAuth(); verifyAuthAlumnos();}, [])


  console.log("user", user);
  console.log("alumno", alumno);

  return (
    <BrowserRouter>

      {/*  METER ALGUNA CONDICIONAL SOLO PARA ADMIN */}
      {user.authToken == 'admin' ? 
      <ModalProvider initialModalData={dataModalEncuesta}>
        <AdminHomeHeader />
        {/* <AdminHomeHeader _user={user}/> */}
      </ModalProvider>
      : <HomeHeader/>
      }

      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="sign" element= { <SignInPage /> } />
        <Route path="prueba" element={<EncuestaPage />} />
        <Route path="encuesta" element= { <ProtectedRouteAlumnos /> } >
          <Route index element= {<EncuestaPage /> } />
        </Route>
        <Route path="estadisticas" element={<EstadisticasPage />} />
        <Route path="estadisticas/:periodo/:claveLic/:nombreLic" element={<EstadisticasDetallesPage />} />


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
