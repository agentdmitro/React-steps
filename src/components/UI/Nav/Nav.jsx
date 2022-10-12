import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import MyButton from "../button/MyButton";
import { AuthContext } from "./../../../context/index";


function Nav() {

    const {isAuth, setIsAuth} = useContext(AuthContext);   

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="nav">
            {isAuth ? 
            <MyButton onClick={logout}>
                Вийти
            </MyButton> 
            : 
            ''
            }
            <div className="nav__links">
            <Link to="/about">About page</Link>
            <Link to="/posts">Posts page</Link>
            </div>
        </div>
    )
}
export default Nav