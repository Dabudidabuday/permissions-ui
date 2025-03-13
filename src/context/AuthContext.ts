import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

import { User } from "../types";

export const AuthContext = createContext({
  user: null as User | null,
  setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,
  policies: [] as string[],
  setPolicies: (() => {}) as Dispatch<SetStateAction<string[]>>,
  fetchPolicies: async () => ({}) as Promise<QueryObserverResult>,
  isLoading: false as boolean,
});


export const useAuth = () => useContext(AuthContext);
