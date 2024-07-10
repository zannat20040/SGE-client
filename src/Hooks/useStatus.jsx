import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useStatus = () => {
  const { user } = useContext(AuthContext); // Assuming AuthContext provides user object

  const { data: userinfo, refetch } = useQuery({
    queryKey: ['status', user.email],
    queryFn: async () => {
      let status = "member"; 

      if (user && user.email === 'mco@gmail.com') {
        status = "mco";
      }

      return { status };
    },
  });

  return { userinfo, refetch };
};

export default useStatus;
