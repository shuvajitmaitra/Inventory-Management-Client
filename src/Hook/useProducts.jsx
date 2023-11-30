import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${user?.email}`);
      return res.data;
    },
  });

  return [products, refetch, isLoading];
};
export default useProducts;
