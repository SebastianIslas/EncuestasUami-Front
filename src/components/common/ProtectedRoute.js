import {useContext, useEffect} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.js";


const ProtectedRoute = ({
    redirectPath = '/',
    children,
  }) => {

    const {state} = useContext(AuthContext)
    console.log(state)

    if (state.isLoginPending) {
      return 
    }else if(!state.isLoggedIn){
      return <Navigate to={redirectPath} replace />;
    }else {
      return children ? children : <Outlet />;
    }
  };

export default ProtectedRoute;