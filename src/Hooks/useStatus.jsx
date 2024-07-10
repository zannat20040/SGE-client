import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStatus = ({ email }) => {
  const axiosPublic = useAxiosPublic();

  const { data: userinfo, refetch } = useQuery({
    queryKey: [email],
    queryFn: async () => {
      const res = await axiosPublic.get(``);
      const userinfo = res.data?.data;

      return userinfo;
    },
  });
  return { userinfo, refetch };
};

export default useStatus;