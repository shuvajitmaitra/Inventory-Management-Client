import { NavLink, useLocation } from "react-router-dom";
import { FaTree } from "react-icons/fa";
import useAuth from "../Hook/useAuth";
import useManager from "../Hook/useManager";
import Swal from "sweetalert2";


const Navbar = () => {
  const {user, logOut} = useAuth()
 const location = useLocation()
 const navActive = "border-b-2 border-red-500 pb-1"
 const navNormal = "text-medium "
 const [isManager] = useManager()

const handleLogOut = () => {
  Swal.fire({
    title: "Logout?",
    text: "Do you want to logged out from here!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "LogOut",
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then((result) => {
          console.log(result.user);
          Swal.fire({
            title: "Deleted!",
            text: "Your are successfully delete!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  });
};
const navLink = <>
<li>
    <NavLink className={location.pathname === "/"? navActive : navNormal} to={'/'}>Home</NavLink>
</li>
<li>
    <NavLink className={location.pathname === "/create-shop"? navActive : navNormal} to={user? "/create-shop" : "/login"}>Create Shop</NavLink>
</li>

{
  isManager && <li>
  <NavLink className={location.pathname === "/dashboard"? navActive : navNormal} to={'/dashboard/products'}>Dashboard</NavLink>
</li>
}

{
  user ?
  <li>
    <button onClick={handleLogOut}>Sign Out</button>
</li>
  :

  <>
  <li>
    <NavLink className={location.pathname === "/login"? navActive : navNormal} to={'/login'}>Login</NavLink>
</li>
<li>
    <NavLink className={location.pathname === "/sign-up"? navActive : navNormal} to={'/sign-up'}>SingUp</NavLink>
</li>
  </> 
  
}
</>

    return(
        <div className="drawer z-10 max-w-screen-2xl mx-auto lg:px-10">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-transparent">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2 text-[#7cb518] text-3xl"><FaTree/> TrendLoom</div>
            <div className="flex-none hidden lg:block">
              <ul className=" menu-horizontal gap-4 font-medium text-[#7cb518]">
            {navLink}
              </ul>
            </div>
          </div>
          {/* Page content here */}
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {navLink}
          </ul>
        </div>
      </div>
    )}
export default Navbar;