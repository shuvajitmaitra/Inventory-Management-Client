import { FaCreativeCommonsSampling } from "react-icons/fa";
import { TbAdCircle, TbPremiumRights } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";



const SubscriptionPage = () => {
  const cardStyle =
    "min-h-1/2 max-w-lg flex flex-col  shadow-2xl  shadow-zinc-400 rounded-lg bg-white space-y-4 p-10";

  return (
    <div className="min-h-screen  flex py-10 justify-center items-center flex-col space-y-10 bg-zinc-100 ">
      <h4 className="text-5xl font-bold text-[#373737]">Subscription Plan</h4>
      <div className="w-full max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={cardStyle}>
         <div className="relative flex items-center justify-center text-3xl font-bold gap-4 ">
         <FaCreativeCommonsSampling className="absolute top-2 left-2 text-[#7cb518]"/>
          <h3 className="">Basic</h3>
         </div>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 1</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 2</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 3</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 4</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 5</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 6</p>
          <button className="btn bg-[#7cb518]">Purchase</button>
        </div>
        <div className={cardStyle}>
         <div className="relative flex items-center justify-center text-3xl font-bold gap-4 ">
         <TbAdCircle  className="absolute top-2 left-2 text-[#7cb518]"/>
          <h3 className="">Advance</h3>
         </div>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 1</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 2</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 3</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 4</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 5</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 6</p>
          <button className="btn bg-[#7cb518]">Purchase</button>
        </div>
        <div className={cardStyle}>
         <div className="relative flex items-center justify-center text-3xl font-bold gap-4 ">
         <TbPremiumRights  className="absolute top-2 left-2 text-[#7cb518]"/>
          <h3 className="">Premium</h3>
         </div>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 1</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 2</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 3</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 4</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 5</p>
          <p className="flex items-center gap-8"> <FcApproval/> Feature 6</p>
          <button className="btn bg-[#7cb518]">Purchase</button>
        </div>
        </div>
    </div>
  );
};
export default SubscriptionPage;
