import { PropTypes } from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useManager from "../Hook/useManager";
import useAuth from "../Hook/useAuth";
import useAdmin from "../Hook/useAdmin";


const DashboardRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isManager, isLoading] = useManager()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
  
    
    if (loading || isLoading || isAdminLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <progress className="progress w-56"></progress>
        </div>
      );
    }
    if (user&& isManager || user && isAdmin) {
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
  
  
  DashboardRoute.propTypes = {
    children : PropTypes.node
  }
export default DashboardRoute;