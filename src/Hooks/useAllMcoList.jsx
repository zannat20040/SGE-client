import React, { useContext } from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../AuthProvider/AuthProvider';

export default function useAllMcoList() {
    const axiosPublic = useAxiosPublic(); 
    const { user } = useContext(AuthContext);

    const {
      data: allMcoList,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["allMco"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/admin/all-mco`, {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        });
        return res?.data;
      },
    });
  
    return { allMcoList, isLoading, refetch };
}
