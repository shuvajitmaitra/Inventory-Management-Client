import { Outlet, useLocation,  } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Helmet } from "react-helmet-async";
 
const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooterLogin = location.pathname.includes('login' )
    const noHeaderFooterSignUp = location.pathname.includes('sign-up')
    return ( 
       <div>
          <Helmet>
        <title>TrendLoom | Main</title>
      </Helmet>
       { noHeaderFooterLogin|| noHeaderFooterSignUp || <Navbar></Navbar>}
        <Outlet></Outlet>
        {/* {noHeaderFooter ||<Footer></Footer>} */}
       </div>
    );
};

export default MainLayout;