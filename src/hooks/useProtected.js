"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/customModals/AuthModal";
import userAuth from "./userAuth";
import toast from "react-hot-toast";

const Protected = ({ children }) => {
  const [isAuthModal, setAuthModal] = useState(false);
  const isAuthenticated = userAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Show the message, open the modal, and trigger toast notification
      setAuthModal(true);
      toast.error("You have to login first");

      // Redirect after 3 seconds, but keep the modal open
      const timer = setTimeout(() => {
        router.push("/"); // Redirect to the desired page
      }, 90000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <>
        {isAuthModal && (
          <AuthModal
            isAuthModal={isAuthModal}
            setAuthModal={setAuthModal}
        
          />
        )}
      </>
    );
  }
  // Render children if authenticated
  return <>{children}</>;
};

export default Protected;
