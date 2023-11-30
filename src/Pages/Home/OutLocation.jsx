import Map from "react-map-gl";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import RouteTitle from "../../Components/RouteTitle";

const OurLocation = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos="fade-right"
      
      data-aos-duration="700"
      className="lg:w-[600px] lg:h-[500px] h-[300px]  my-5 overflow-hidden rounded space-y-10"
    >
      <RouteTitle heading="Our Location" />
      <Map
        mapboxAccessToken="pk.eyJ1Ijoic2h1dmFqaXRtYWl0cmEiLCJhIjoiY2xwaXhwbGh1MDN5dDJqbW1odHdsZGN5NSJ9.rTPlKAECaM8NOGvcxfLbZw"
        initialViewState={{
          longitude: 90.3537,
          latitude: 23.7956,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
};
export default OurLocation;
