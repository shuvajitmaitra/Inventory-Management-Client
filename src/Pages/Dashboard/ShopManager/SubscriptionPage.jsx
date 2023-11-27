import { FaCreativeCommonsSampling } from "react-icons/fa";
import { TbAdCircle, TbPremiumRights } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useManagerInfo from "../../../Hook/useManagerInfo";

const SubscriptionPage = () => {
  const [manager, isLoading] = useManagerInfo();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  const cardStyle =
    " flex flex-col  shadow-2xl  shadow-zinc-400 rounded-lg bg-[#7bb51865] space-y-4 p-10";

  return (
    <div className=" flex py-10 justify-center items-center flex-col space-y-10 bg-zinc-100 ">
      <Helmet>
        <title>TrendLoom | Subscription</title>
      </Helmet>
      <h2 className="text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
      Subscription
        </h2>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        <div className={cardStyle}>
          <div className=" flex items-center justify-center text-3xl font-bold gap-4 ">
            <FaCreativeCommonsSampling className=" text-[#7cb518]" />
            <h3 className="">Basic</h3>
          </div>
          <p className="flex items-center gap-8">
            <FcApproval /> Pay Only $10
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Increase product add limit
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Product limit upto 200
          </p>
          <Link
            to={`${
              manager?.subscriptionType === "Basic" ||
              manager?.subscriptionType === "Advance" ||
              manager?.subscriptionType === "Premium"
                ? ""
                : `/dashboard/payment/${10}`
            }`}
          >
            <button
              disabled={
                manager?.subscriptionType === "Basic" ||
                manager?.subscriptionType === "Advance" ||
                manager?.subscriptionType === "Premium"
              }
              className="btn bg-[#7cb518]"
            >
              Purchase
            </button>
          </Link>
        </div>
        <div className={cardStyle}>
          <div className=" flex items-center justify-center text-3xl font-bold gap-4 ">
            <TbAdCircle className=" text-[#7cb518]" />
            <h3 className="">Advance</h3>
          </div>
          <p className="flex items-center gap-8">
            <FcApproval /> Pay Only $20
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Increase product adding limit
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Product limit upto 450
          </p>
          <Link
            to={`${
              manager?.subscriptionType === "Advance" ||
              manager?.subscriptionType === "Premium"
                ? ""
                : `/dashboard/payment/${20}`
            }`}
          >
            <button
              disabled={
                manager?.subscriptionType === "Advance" ||
                manager?.subscriptionType === "Premium"
              }
              className="btn bg-[#7cb518]"
            >
              Purchase
            </button>
          </Link>
        </div>
        <div className={cardStyle}>
          <div className=" flex items-center justify-center text-3xl font-bold gap-4 ">
            <TbPremiumRights className=" text-[#7cb518]" />
            <h3 className="">Premium</h3>
          </div>
          <p className="flex items-center gap-8">
            <FcApproval /> Pay Only $50
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Increase product add limit
          </p>
          <p className="flex items-center gap-8">
            <FcApproval /> Product limit upto 1500
          </p>
          <Link
            to={`${
              manager?.subscriptionType === "Premium"
                ? ""
                : `/dashboard/payment/${50}`
            }`}
          >
            <button
              disabled={manager?.subscriptionType === "Premium"}
              className="btn bg-[#7cb518]"
            >
              Purchase
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionPage;
