import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useStatus = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user);
  const { data: userinfo, refetch } = useQuery({
    queryKey: [email],
    queryFn: async () => {
      const res = await axiosPublic.get(`//${user?.email}`);
      const userinfo = res.data?.data;
      console.log(userinfo);
      return userinfo;
    },
  });
  return { userinfo, refetch };
};

export default useStatus;
