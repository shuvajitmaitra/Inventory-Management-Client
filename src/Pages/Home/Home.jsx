import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OurLocation from "./OutLocation";
import Feedback from "./Feedback";
import OurTeam from "./OurTeam";
import About from "./About";
import CustomerReviews from "./CustomerReviews";
import HomePageProduct from "./HomePageProduct";

const Home = () => {
  return (
    <div className="overflow-clip">
      <Helmet>
        <title>TrendLoom | Home</title>
      </Helmet>
      <Banner></Banner>
<HomePageProduct></HomePageProduct>
      <OurTeam/>
      <About/>
      <CustomerReviews/>
      <div className="max-w-screen-xl mx-auto lg:flex justify-between items-center gap-6 mb-10 overflow-clip">

      <OurLocation className='flex-1 ' />
      <Feedback className='flex-1'/>
      </div>
    </div>
  );
};
export default Home;
