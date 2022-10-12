import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/UI/Nav/Nav";
import './styles/App.css';
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])

  return(
    <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
      <BrowserRouter>
        <Nav></Nav>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
