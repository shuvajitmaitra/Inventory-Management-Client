import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useManager from "../Hook/useManager";
import useAdmin from "../Hook/useAdmin";
import Swal from "sweetalert2";
import { IoStorefrontOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const navActive = "border-b-2 border-red-500 pb-1";
  const navNormal = "text-medium ";
  const [isManager] = useManager();
  const [isAdmin] = useAdmin();

  useEffect(() => {
    AOS.init()
  }, [])

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
  const navLink = (
    <>
      <li>
        <NavLink
          className={location.pathname === "/" ? navActive : navNormal}
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={
            location.pathname === "/create-shop" ? navActive : navNormal
          }
          to={user ? "/create-shop" : "/login"}
        >
          Create Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          className={
            location.pathname === "/watch-demo" ? navActive : navNormal
          }
          to={"/watch-demo"}
        >
         Watch Demo
        </NavLink>
      </li>

      {isManager && (
        <li>
          <NavLink
            className={
              location.pathname === "/dashboard" ? navActive : navNormal
            }
            to={"/dashboard/products"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {isAdmin && (
        <li>
          <NavLink
            className={
              location.pathname === "/dashboard" ? navActive : navNormal
            }
            to={"/dashboard/all-shop"}
          >
            Dashboard
          </NavLink>
        </li>
      )}


      {user ? (
        <>
          <li>
            <button onClick={handleLogOut}>Sign Out</button>
          </li>
          <li>
            <div className="flex m-0 justify-center items-center gap-2 border-2 bg-[#7bb51848] border-[#7cb518] rounded-full w-fit">
              <img
                src={user.photoURL}
                className="rounded-full w-10 h-10 "
              />
              <p className="capitalize text-white font-medium mr-3">
                {user.displayName}
              </p>
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className={location.pathname === "/login" ? navActive : navNormal}
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                location.pathname === "/sign-up" ? navActive : navNormal
              }
              to={"/sign-up"}
            >
              Join Us
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="1500"  aria-label="close sidebar" className="drawer  z-10 max-w-screen-xl mx-auto lg:px-10">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-transparent">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-[#7cb518] text-3xl">
            <IoStorefrontOutline /> TrendLoom
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="flex items-center gap-4 font-medium text-[#7cb518]">
              {navLink}
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          
          className="drawer-overlay"
        ></label>
        <ul className=" flex justify-start gap-2 flex-col p-6 w-1/2 md:w-1/3 min-h-full text-[#7cb518] bg-[#daebbe]">
          {/* Sidebar content here */}
          {navLink}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
