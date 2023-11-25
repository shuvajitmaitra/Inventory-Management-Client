import imageOne from "../../assets/tree-1.jpg"
import imageTwo from "../../assets/tree-2.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Banner = () => {


    return(
        <div className="max-w-screen-2xl mx-auto -mt-16">
      <Carousel infiniteLoop="true" autoPlay="true" interval={3000} showThumbs={false}>
        <div className="max-h-[600px]">
          <img
            src={imageOne}
            className=" h-full"
          />
        </div>
        <div className="max-h-[600px]">
          <img
            src={imageTwo}
            className=" h-full"
          />
        </div>
        <div className="max-h-[600px]">
          <img
            src={imageOne}
            className=" h-full"
          />
        </div>
        <div className="max-h-[600px]">
          <img
            src={imageTwo}
            className=" h-full"
          />
        </div>
        <div className="max-h-[600px]">
          <img
            src={imageOne}
            className=" h-full"
          />
        </div>
      </Carousel>
    </div>
    )}
export default Banner;