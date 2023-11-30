import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { A11y,  } from "swiper/modules";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const OurTeam = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetch("/team.json")
      .then((res) => res.json())
      .then((data) => setMembers(data));
      
   
  }, []);

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="py-20 my-20   flex justify-center items-center bg-[#7bb5185d] md:px-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        loop={true}
        modules={[A11y]}
        className="mySwiper max-w-screen-xl"
        data-aos="zoom-out-down"
      >
          {members?.map((member, index) => (
            <SwiperSlide key={index}>
             <div  data-aos={`${index==0 && "fade-right" || index==1 && "fade-down" ||index==2 && "fade-up" ||index==3 && "fade-left" }`} className="bg-white p-6 rounded">
             <img
                src={member.image}
                alt=""
              />
              <h3 className="font-medium text-xl pt-4 ">{member.name}</h3>
              <p className="text-zinc-600">{member.designation}</p>
             </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default OurTeam;
