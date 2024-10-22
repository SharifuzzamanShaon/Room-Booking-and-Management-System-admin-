"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  user: null,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      const updatedUser = action.payload;

      // Store the updated user in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return {
        ...state,
        user: updatedUser,
      };
    case "LOGOUT":
      // Clear the user data from localStorage
      localStorage.removeItem("user");

      return {
        ...state,
        user: null, // Reset user to null on logout
      };
    default:
      return state;
  }
};

// Create the context provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
      }
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
