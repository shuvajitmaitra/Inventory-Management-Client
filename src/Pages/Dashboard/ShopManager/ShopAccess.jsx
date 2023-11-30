import { Helmet } from "react-helmet-async";
import RouteTitle from "../../../Components/RouteTitle";
import useManagerInfo from "../../../Hook/useManagerInfo";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";


const ShopAccess = () => {
  const [manager] = useManagerInfo();
  const handleCopy = (e)=>{
    e.preventDefault()
    const shopId = e.target.id.value
    const isCopy = copy(shopId)

    if (isCopy) {
        toast.success("Copied to Clipboard");
      }
  }
  return (
    <div className=" ">
      <Helmet>
        <title>TrendLoom | Subscription</title>
      </Helmet>
      <RouteTitle heading="Shop Access key" />
      <div className="h-[60vh] flex justify-center items-center ">
        <form onSubmit={handleCopy} className="flex item-center justify-center border-2 border-[#7cb518] rounded">
          <input type="text" name="id" className="p-3" disabled  defaultValue={manager.
        shopId}/>
          <button  type="submit" className="bg-[#7cb518] p-3 btn rounded-none border-none text-zinc-300 hover:text-black" ><FaCopy/> Copy</button>
        </form>
      </div>
    </div>
  );
};
export default ShopAccess;
