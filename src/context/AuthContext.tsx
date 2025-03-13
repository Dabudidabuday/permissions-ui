import { createContext, Dispatch, SetStateAction } from "react";
import { User } from '../types';
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

export const AuthContext = createContext({
  user: null as User | null,
  setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,
  policies: [] as string[],
  setPolicies: (() => {}) as Dispatch<SetStateAction<string[]>>,
  fetchPolicies: (() => Promise.resolve()) as (options?: RefetchOptions) => Promise<QueryObserverResult>,
  isLoading: false,
}); 
