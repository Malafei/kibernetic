import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoginPage from "./components/auth/Login/LoginPage";
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import NewsPage from './components/news/main/NewsPage';
import EditPage from './components/news/edit/EditPage';
import AddNewsPage from './components/news/add/AddPage';


function App() {
  //const { isAuth } = useSelector(redux => redux.auth);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/news" element={<NewsPage />}></Route>
          <Route exact path="/news/add" element={<AddNewsPage />}></Route>
          <Route exact path="/news/edit/:id" element={<EditPage />}></Route>


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
