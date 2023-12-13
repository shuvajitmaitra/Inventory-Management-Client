import { A11y, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperNavButtons } from "./SwiperNavButtons";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import StarRating from "../../Components/StarRating";
import { useEffect, useState } from "react";

const CustomerReviews = () => {
 const [reviews, setReviews] = useState([]);
 useEffect(() => {
  fetch("/reviews.json")
    .then((res) => res.json())
    .then((data) => setReviews(data));
    
 
}, []);
 
  return (
    <div className=" bg-[#7bb51862] py-10 rounded-lg">
      <Swiper
        modules={[Navigation, A11y]}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="h-[50vh] lg:h-[500px] flex flex-col items-center justify-center space-y-4 ">
              <img
                src={review.image}
                className="rounded-full border-4 border-white w-24 h-24 object-cover"
              />
              <h2 className="text-center font-bold text-3xl md:text-5xl">
                {review.name}
              </h2>
              <p className="text-center">{review.review}</p>
              <p className=" flex items-center text-base text-gray-500">
                Rating: <StarRating rating={review.rating}></StarRating>
              </p>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute top-1/2 z-50 right-0 left-0">
          <SwiperNavButtons></SwiperNavButtons>
        </div>
      </Swiper>
    </div>
  );
};

export default CustomerReviews;
