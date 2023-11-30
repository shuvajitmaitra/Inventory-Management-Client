import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { A11y, Autoplay } from "swiper/modules";
import image1 from "../../assets/store/1.png"
import image2 from "../../assets/store/2.png"
import image3 from "../../assets/store/3.png"
import image4 from "../../assets/store/4.png"
import image5 from "../../assets/store/5.png"
import image6 from "../../assets/store/6.png"
import image7 from "../../assets/store/7.png"
import image8 from "../../assets/store/8.png"
import image9 from "../../assets/store/9.png"

const Banner = () => {


    return(
        <div className="max-w-screen-xl mx-auto -m-16 overflow-clip">
     <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        modules={[A11y, Autoplay]}
        className="mySwiper max-w-screen-xl"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px]">
         <img
            src={image8}
            className="h-full block mx-auto"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image1}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image2}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image3}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image4}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image5}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image6}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image7}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="max-h-[600px]">
         <div className=" h-[600px] object-cover md:object-fill">
         <img
            src={image9}
            className=" h-full mx-auto block"
          />
         </div>
        </div>
      </SwiperSlide>
      </Swiper>
    </div>
    )}
export default Banner;


  