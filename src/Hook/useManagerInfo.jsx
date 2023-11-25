import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosPublic from "./useAxiosPublic"


const useManagerInfo = () => {
const {user} = useAuth()
const axiosPublic = useAxiosPublic()

    const {data:manager} = useQuery({
        queryKey:["user", user.email],
        queryFn: async()=>{
           const res = await axiosPublic.get(`/manager/${user.email}`)
           return res?.data
        }
       })
    return [manager]
}
export default useManagerInfo;