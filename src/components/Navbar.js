import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router';
import { logout } from './auth/Login/Action';
import { MOODLE } from '../constants/ActionConst';
import { ShowGroup } from './schedule/main/Action';



const Navbar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const {isAuth, user} = useSelector(redux => redux.auth);
    

    const onClickLogout = (e) =>{
        e.preventDefault();
        dispatch(logout());
        history("/");
    }

    useEffect(() => {
        try {
            dispatch(ShowGroup())
            .then(res =>{
                
            })
            .catch()
            
        }
        catch (error) {
            console.log("server error global", error);
        }

    },[])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Головна</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!isAuth ?
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/news">Новини</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/shedule">Розклад занять</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href={MOODLE}>Moodle</a>
                            </li>
                        </ul> 
                        :
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/news">Новини</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/shedule">Розклад занять</Link>
                            </li>
                        </ul> 
                    }        
                    {!isAuth ? 
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Вхід</Link>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users" >Користувачі</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout" onClick={onClickLogout} >{user}(Вихід)</Link>
                        </li>
                        </ul>
                    }   
                    </div>
                </div>
            </nav>
        </>
    )
};
export default Navbar