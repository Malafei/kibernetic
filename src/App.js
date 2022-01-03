import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import LoginPage from "./components/auth/Login/LoginPage";
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route exact path="/login" element={<LoginPage/>}></Route>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
