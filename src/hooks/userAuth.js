"use client";
import { useGlobalContext } from "../../ContextAPI/GlobalContext";

const userAuth = () => {
  const { state } = useGlobalContext();
  
  // Check if localStorage is available (client-side only)
  const isClient = typeof window !== 'undefined';
  
  // Check if user is in state or back to localStorage (if available)
  const user = state.user || (isClient ? JSON.parse(localStorage.getItem("user") || "null") : null);
  
  return !!state.user || !!user;
};

export default userAuth;
