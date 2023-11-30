import { PropTypes } from "prop-types";


const RouteTitle = ({heading}) => {


    return(
        <div>
        <h2 className="text-3xl lg:text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
          {heading}
        </h2>
      </div>
    )}

    RouteTitle.propTypes={
        heading: PropTypes.string
    }
export default RouteTitle;