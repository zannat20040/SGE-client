import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

export default function useAllMcoList() {
    const axiosPublic = useAxiosPublic(); 

    const {
      data: allMcoList,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["allMco"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/admin/all-mco`, {
          headers: {
            Authorization: `Bearer admin@gmail.com`,
          },
        });
        return res?.data;
      },
    });
  
    return { allMcoList, isLoading, refetch };
}
