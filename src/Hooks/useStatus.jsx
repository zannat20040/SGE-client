import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useStatus = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: userinfo, isLoading, refetch, isError } = useQuery({
    queryKey: [user?.email],  
    queryFn: async () => {
      if (user?.email) {  
        const res = await axiosPublic.get(`/role/${user.email}`);
        const userinfo = res?.data?.role;
        return userinfo;
      }
      return null; 
    },
  });

  return { userinfo, refetch, isError, isLoading };
};

export default useStatus;
