import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useManager = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isManager, isLoading } = useQuery({
    queryKey: [user?.email, "isManager"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res?.data?.manager;
    },
  });
console.log(isManager);
  return [isManager, isLoading];
};
export default useManager;
