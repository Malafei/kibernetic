import './App.css';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import LoginPage from "./components/auth/Login/LoginPage";
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import NewsPage from './components/news/main/NewsPage';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route exact path="/login" element={<LoginPage/>}></Route>
        <Route exact path="/news" element={<NewsPage/>}></Route>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
