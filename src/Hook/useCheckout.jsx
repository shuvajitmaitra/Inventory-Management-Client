import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCheckout = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: checkedProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["checkedOut", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product-check-out/${user.email}`);
      return res.data;
    },
  });
  console.log(checkedProducts);
  return [checkedProducts, refetch, isLoading];
};
export default useCheckout;
