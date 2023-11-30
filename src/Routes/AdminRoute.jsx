import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAdmin from "../Hook/useAdmin";


const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
  
    
    if (loading || isAdminLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <progress className="progress w-56"></progress>
        </div>
      );
    }
    if (user && isAdmin) {
      return children;
    } else {
      return (
        <>

        <Navigate
          to="/forbidden"
        >
        </Navigate>
        </>
      );
    }
  };
  
  
  AdminRoute
.propTypes = {
    children : PropTypes.node
  }
export default AdminRoute;