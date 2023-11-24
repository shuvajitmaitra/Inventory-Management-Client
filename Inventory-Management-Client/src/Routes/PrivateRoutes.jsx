import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        state={{from:location.pathname}}
        replace
      ></Navigate>
    );
  }
};


PrivateRoutes.propTypes = {
  children : PropTypes.node
}
export default PrivateRoutes;
