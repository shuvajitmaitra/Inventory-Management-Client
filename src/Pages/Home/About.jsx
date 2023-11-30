import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { A11y } from "swiper/modules";
import image1 from "../../assets/about/vision.jpg";
import image2 from "../../assets/about/rules.jpg";
import image3 from "../../assets/about/product.jpg";
import image4 from "../../assets/about/global.jpg";
import image5 from "../../assets/about/community.jpg";
import image6 from "../../assets/about/security.jpg";
import image7 from "../../assets/about/journey.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import RouteTitle from "../../Components/RouteTitle";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const divStyle = "bg-red-500 h-40 w-40 block right-0 left-0 mx-auto";
  const imageStyle = "h-full";
  return (
    <div className="bg-[#7bb51846] py-10 pb-20">
      <RouteTitle heading="About Us" />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        modules={[A11y]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="mySwiper max-w-screen-xl"
      >
        <SwiperSlide>
          <div
            data-aos="flip-left"
            className="bg-white  lg:p-8 p-6  rounded flex flex-col h-[450px] space-y-2"
          >
            <div className={divStyle}>
              <img
                src={image1}
                className={imageStyle}
              />
            </div>
            <div>
              <h3 className="font-medium text-xl  text-center  ">Our Vision</h3>
              <p className="text-zinc-600">
                At TrendLoom, we envision a world where creativity knows no
                bounds. Whether youre a passionate artist, a skilled craftsman,
                or a trendsetting designer, we provide the canvas for you to
                paint your entrepreneurial dreams. Our platform is more than
                just a marketplace; innovation, and the power of individual .
              </p>
              <div className=" flex-grow"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            data-aos="flip-right"
            className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 "
          >
            <div className={divStyle}>
              <img
                src={image2}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              Your Shop, Your Rules
            </h3>
            <p className="text-zinc-600">
              Here, you are the captain of your ship. Create a shop that
              reflects your personality and style. Tailor your storefront with
              customizable features, telling your brand story in a way that
              resonates with your audience. With user-friendly tools and a
              seamless interface, managing your shop has never been easier.
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            data-aos="flip-up"
            className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 "
          >
            <div className={divStyle}>
              <img
                src={image3}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              An Array of Products
            </h3>
            <p className="text-zinc-600">
              From handcrafted masterpieces to cutting-edge digital creations,
              [Your Website Name] welcomes a diverse range of products. Whether
              youre into fashion, art, home decor, or any other category, our
              platform provides a stage for your offerings to shine. Your
              imagination is the only limit!
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 ">
            <div className={divStyle}>
              <img
                src={image4}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              Global Reach, Local Impact
            </h3>
            <p className="text-zinc-600">
              Expand your horizons and connect with customers from every corner
              of the globe. [Your Website Name] is not just a marketplace; its a
              bridge that brings your creations to a worldwide audience. At the
              same time, we encourage the support of local businesses, fostering
              a sense of community and shared success.
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 ">
            <div className={divStyle}>
              <img
                src={image5}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              Community & Collaboration
            </h3>
            <p className="text-zinc-600">
              Join a thriving community of like-minded individuals who share
              your passion for creativity and entrepreneurship. Collaborate with
              fellow shop owners, exchange ideas, and learn from one another.
              Together, we grow and uplift each other, creating a supportive
              ecosystem that extends beyond the digital realm.
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 ">
            <div className={divStyle}>
              <img
                src={image6}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              Secure and Seamless Transactions
            </h3>
            <p className="text-zinc-600">
              Trust and security are at the core of [Your Website Name]. Our
              robust platform ensures secure transactions, giving both sellers
              and buyers peace of mind. Focus on what you do best creating while
              we handle the technicalities, making your selling experience
              smooth and worry-free.
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white lg:p-8 p-6 rounded flex flex-col h-[450px] space-y-2 ">
            <div className={divStyle}>
              <img
                src={image7}
                className={imageStyle}
              />
            </div>
            <h3 className="font-medium text-xl text-center pt-4 ">
              Join Us on the Journey
            </h3>
            <p className="text-zinc-600">
              Embark on the exciting journey of entrepreneurship with [Your
              Website Name]. Whether you a seasoned seller or just starting, our
              platform is designed to elevate your online business. Let your
              creativity run wild, and let [Your Website Name] be the stage
              where your dreams take center stage.{" "}
            </p>
            <div className="flex-grow"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default About;
