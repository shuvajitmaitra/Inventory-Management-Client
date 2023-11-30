import { Helmet } from "react-helmet-async";
import RouteTitle from "../../Components/RouteTitle";

const WatchDemo = () => {
  return (
    <div>
      <Helmet>
        <title>TrendLoom | Watch Demo</title>
      </Helmet>
      <RouteTitle heading="Our Store Introduction"></RouteTitle>
      <div className="flex justify-center items-center py-10">
        <iframe
          className="rounded-xl"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6okddtpBcTE?si=kUwWdrrcJDhMgp84"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};
export default WatchDemo;
