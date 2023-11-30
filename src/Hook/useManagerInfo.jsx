import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useManagerInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: manager={}, isLoading } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/${user.email}`);
      return res?.data;
    },
  });
  return [manager, isLoading];
};
export default useManagerInfo;
