import { Link } from "react-router-dom";
import forbiddenImage from "../assets/Forbidden/Forbidden.png"
import { Helmet } from "react-helmet-async";

const ForbiddenRoute = () => {


    return(
        <div className="group bg-[#7bb51850]">
        <Helmet>
        <title>TrendLoom | Forbidden</title>
      </Helmet>
      <div className="h-screen relative overflow-hidden">
        <img src={forbiddenImage} className="object-contain h-full block mx-auto" />
        <div className="absolute h-full w-full bg-[#7cb518] bg-opacity-20 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link to='/'>
          <button className="btn bg-[#7cb518] text-white py-2 px-5">Back Home</button>
          </Link>
        </div>
      </div>
    </div>
    )}
export default ForbiddenRoute;