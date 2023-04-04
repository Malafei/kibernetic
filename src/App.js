import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoginPage from "./components/auth/Login/LoginPage";
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import NewsPage from './components/news/main/NewsPage';
import EditNewsPage from './components/news/edit/EditNewsPage';
import AddNewsPage from './components/news/add/AddPage';
import ShedulePage from './components/schedule/main/ShedulePage';
import SheduleAdminPage from './components/schedule/admin/SheduleAdminPage';
import UsersPage from './components/users/main/UsersPage';
import EditUserPage from './components/users/edit/EditUserPage';
import AddUserPage from './components/users/add/AddUserPage';


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
          <Route exact path="/news/edit/:id" element={<EditNewsPage />}></Route>
          <Route exact path="/shedule" element={<ShedulePage />}></Route>
          <Route exact path="/shedule/admin" element={<SheduleAdminPage />}></Route>
          <Route exact path="/users" element={<UsersPage/>}></Route>
          <Route exact path="/users/edit/:id" element={<EditUserPage/>}></Route>
          <Route exact path="/users/add" element={<AddUserPage/>}></Route>



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
