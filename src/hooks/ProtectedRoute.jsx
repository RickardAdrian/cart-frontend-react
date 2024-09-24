import { Navigate } from "react-router-dom";
import {useAuthStore} from "../store/AuthStore"
import { useUsuariosStore } from "..";
export const ProtectedRoute = ({ children, accessBy }) => {
   const {isAuthenticated } = useAuthStore()
  // const {datausuarios } = useUsuariosStore()
  if (accessBy === "non-authenticated") {
    if (!isAuthenticated) {
      return children;
    } else {
     
      return <Navigate to="/" />;
    }
  } else if(accessBy==="authenticated"){
    if(isAuthenticated){
      return children;
    }
  }
  return <Navigate to="/login"/>


};
