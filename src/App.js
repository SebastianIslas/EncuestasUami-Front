import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
import AdminLoginPage from "./pages/AdminLoginPage.js";
import EncuestaPage from "./pages/EncuestaPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminPage from "./pages/AdminPage.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <HomePage /> } />
        <Route path="login" element= { <LoginPage /> } />
        <Route path="encuesta" element= { <EncuestaPage /> } />
        <Route path="admin" element= { <AdminPage /> } />
        <Route path="*" element= { <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
