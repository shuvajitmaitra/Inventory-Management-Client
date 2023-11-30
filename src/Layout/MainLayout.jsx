import { Outlet, useLocation,  } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "../Shared/Footer";
 
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
        <div >
        <Outlet></Outlet>
        </div>
        {noHeaderFooterLogin|| noHeaderFooterSignUp ||<Footer></Footer>}
       </div>
    );
};

export default MainLayout;