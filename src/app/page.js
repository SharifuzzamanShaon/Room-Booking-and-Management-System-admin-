"use client";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import AuthModal from "@/components/customModals/AuthModal";
import toast from "react-hot-toast";
export default function Home() {
  useEffect(() => {
    toast(
      "Please enable third-party cookies in your browser settings for the best experience.",
      {
        duration: 9000,
      }
    );
  }, []);
  const [isAuthModal, setAuthModal] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      {/* <Header></Header> */}
      <div className="container mx-auto px-4 justify-between items-center min-h-screen py-6">
        {isAuthModal && (
          <AuthModal
            isAuthModal={isAuthModal}
            setAuthModal={setAuthModal}
          ></AuthModal>
        )}
      </div>
    </div>
  );
}
