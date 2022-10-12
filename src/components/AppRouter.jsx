
import React, {useContext} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./../router/index";
import { AuthContext } from "./../context/index";
import { Loader } from "./UI/Loader/Loader";

function AppRouter() {

    const {isAuth, isLoading} = useContext(AuthContext);
    
    if(isLoading){
        return <Loader></Loader>
    }

    return (
    <div className="content">
        
        
            {isAuth ? 
            <Switch>
            {privateRoutes.map(route => 
                <Route 
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to='/posts'></Redirect>
            </Switch>
            :
            <Switch>
            {publicRoutes.map(route => 
                <Route 
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to='/login'></Redirect>
            </Switch>
            }
    </div>
    )
}
export default AppRouter