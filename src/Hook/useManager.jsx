import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useManager = () => {
const {user,loading} = useAuth()
const axiosPublic = useAxiosPublic()

const {data:isManager, isLoading} = useQuery({
    queryKey: [user?.email,'isManager'],
    enabled: !loading,
    queryFn: async()=>{
     const res =  await axiosPublic.get(`/users/${user.email}`)
        return res?.data?.manager
    }
})   

return [isManager, isLoading ]
}
export default useManager;