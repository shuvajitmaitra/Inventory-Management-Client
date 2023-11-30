import { FaBars, FaKey, FaShoppingBag } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineHome, MdOutlineSettings, MdOutlineSubscriptions } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";

import { FaCalculator } from "react-icons/fa6";

import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { IoBagCheckOutline } from "react-icons/io5";
import useManager from "../Hook/useManager";
import Footer from "../Shared/Footer";

const Dashboard = () => {
  const location = useLocation()
  const navStyle ="bg-[#7cb518] flex justify-center items-center gap-1 font-medium text-white my-4 py-1 rounded w-full";
  const navActive = "text-[#7cb518] border-2 border-[#7cb518] flex justify-center items-center gap-1 font-medium  my-4 py-1 rounded w-full"
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [isManager, isLoading] = useManager()
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
          .then(() => {
            Swal.fire({
              title: "Log Out!",
              text: "successfully Logged Out!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  const dashLink = (
    <>
     {
      isManager && <>
       <li>
        <NavLink
          className={location.pathname === "/dashboard/products" ? navActive  : navStyle}
          to="/dashboard/products"
        >
          <MdOutlineHome />
          Sales Collections
        </NavLink>
      </li>
      <li>
        <NavLink
          className={location.pathname === "/dashboard/manage-product" ? navActive  : navStyle}
          to="/dashboard/manage-product"
        >
          <MdOutlineSettings />
          Manage Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className={location.pathname === "/dashboard/checked-product" ? navActive  : navStyle}
          to="/dashboard/checked-product"
        >
           <IoBagCheckOutline />
          Check Out
        </NavLink>
      </li>
      <li>
        <NavLink
           className={location.pathname === "/dashboard/subscription-plan" ? navActive  : navStyle}
          to="/dashboard/subscription-plan"
        >
          <MdOutlineSubscriptions />
          Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
           className={location.pathname === "/dashboard/shop-access" ? navActive  : navStyle}
          to="/dashboard/shop-access"
        >
          <FaKey />
          Shop Access
        </NavLink>
      </li>
      <li>
        <NavLink
          className={location.pathname === "/dashboard/sell-summary" ? navActive  : navStyle}
          to="/dashboard/sell-summary"
        >
          <FaCalculator />
          Sell Summary
        </NavLink>
      </li>
      </>
     }

     {
      !isManager && <>
       <li>
        <NavLink
           className={location.pathname === "/dashboard/all-shop" ? navActive  : navStyle}
          to="/dashboard/all-shop"
        >
          <IoStorefrontOutline />
          All Shops
        </NavLink>
      </li>
       <li>
        <NavLink
           className={location.pathname === "/dashboard/admin-sell-summary" ? navActive  : navStyle}
          to="/dashboard/admin-sell-summary"
        >
          <FaCalculator />
          Sell Summary
        </NavLink>
      </li>
      </> 
     }
      <li>
        <NavLink
          className={navStyle}
          to="/"
        >
          <MdOutlineHome />
          Home
        </NavLink>
      </li>
      <li>
        <button
          className={navStyle}
          onClick={handleLogOut}
        >
          <FaShoppingBag />
          Sign Out
        </button>
      </li>
    </>
  );
  return (
    <div className="h-full flex text-center ">
        <Helmet>
        <title>TrendLoom | Dashboard</title>
      </Helmet>
      <div className="hidden lg:block w-64 bg-zinc-200 px-10 py-5 space-y-3">
        <span className="text-xl font-medium flex justify-center items-center gap-2"><IoStorefrontOutline /> TrendLoom</span>
        <ul>{dashLink}</ul>
      </div>

      <div className="lg:hidden z-20">
        <div className="drawer ">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle "
          />
          <div className="absolute p-8  flex items-center gap-6 ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="drawer-button"
            >
              <FaBars className="text-xl " />
            </label>
            {/* <span className="text-xl">TrendLoom </span> */}
          </div>
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className=" lg:w-80 min-h-full px-10 bg-base-200  text-base-content">
              {dashLink}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-screen">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default Dashboard;
