
import { useState } from "react";
import { api } from "../api/api";
import { User, Policy } from '../types';
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [policies, setPolicies] = useState<string[]>([]);

  const { isLoading } = useQuery({
    queryKey: ['getMe'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      setUser(response.data);

      return response.data;
    },
    enabled: !!user
  });


  const { refetch } = useQuery({
    queryKey: ['getPolicies'],
    queryFn: async () => {
      try {
        const userInfo = await api.get('/permissions');
  
        const policies = userInfo.data.role.policies.map((policy: Policy) => policy.name.split('_').join(':').toLowerCase())
        setPolicies(policies);

        return policies;
      } catch (error) {
        console.error('Error fetching policies:', error);
      } 
    },
    enabled: !!user
  });

  return <AuthContext.Provider value={{ user, setUser, policies, setPolicies, fetchPolicies: refetch, isLoading }}>{children}</AuthContext.Provider>;
};
