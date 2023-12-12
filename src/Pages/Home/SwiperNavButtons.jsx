import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-between">
      <button
        onClick={() => swiper.slidePrev()}
        className="text-3xl mx-2 lg:text-5xl bg-[#7cb518]  hover:bg-white rounded-full text-zinc-300 hover:text-[#7cb518]"
      >
        <BsArrowLeftCircleFill />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="text-3xl mx-2 lg:text-5xl bg-[#7cb518]  hover:bg-white rounded-full text-zinc-300 hover:text-[#7cb518]"
      >
        <BsArrowRightCircleFill />
      </button>
    </div>
  );
};