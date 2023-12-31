
import { PropTypes } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useManager from "../Hook/useManager";
import useAuth from "../Hook/useAuth";


const ManagerRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isManager, isLoading] = useManager()
    const location = useLocation()
  
    
    if (loading || isLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <progress className="progress w-56"></progress>
        </div>
      );
    }
    if (user&& isManager ) {
      return children;
    } else {
      return (
        <>

        <Navigate
          to="/"
          state={{from:location.pathname}}
          replace
        >
        </Navigate>
        </>
      );
    }
  };
  
  
  ManagerRoute.propTypes = {
    children : PropTypes.node
  }
export default ManagerRoute;