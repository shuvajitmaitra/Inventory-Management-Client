import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCheckout = () => {
const axiosPublic = useAxiosPublic()
const {user} = useAuth()
const {data:checkedProducts, refetch,isLoading} = useQuery({
    queryKey:["checkedOut",user.email],
    queryFn: async()=>{
        const res = await axiosPublic.get(`/product-check-out/${user.email}`)
        return res.data
    }
})
    return [checkedProducts, refetch, isLoading]
}
export default useCheckout;