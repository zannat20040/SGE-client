import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useStatus = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: userinfo, isLoading, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/role/${user?.email}`);
      const userinfo = res?.data?.role;
      return userinfo;
    },
  });
  return { userinfo, refetch };
};

export default useStatus;
