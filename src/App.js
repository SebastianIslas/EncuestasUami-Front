import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={ <HomePage /> } />
          <Route path="login" element= { <LoginPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
