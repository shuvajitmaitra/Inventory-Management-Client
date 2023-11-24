import { Outlet, useLocation,  } from "react-router-dom";
import Navbar from "../Shared/Navbar";
 
const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login')
    return (
       <div>
       { noHeaderFooter || <Navbar></Navbar>}
        <Outlet></Outlet>
        {/* {noHeaderFooter ||<Footer></Footer>} */}
       </div>
    );
};

export default MainLayout;