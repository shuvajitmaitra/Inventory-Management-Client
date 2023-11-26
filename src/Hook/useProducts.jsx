
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {


    const axiosPublic = useAxiosPublic()
const {user} = useAuth()
const {data: products=[], refetch} =useQuery({
    queryKey: ['cart', user?.email],
    queryFn : async()=>{
        const res = await axiosPublic.get(`/products/${user?.email}`)
        return res.data
    }
})

    return [products, refetch]

}
export default useProducts;



