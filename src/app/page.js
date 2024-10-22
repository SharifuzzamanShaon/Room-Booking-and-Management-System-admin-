"use client";
import Header from "@/components/Header";
import { useState } from "react";
import AuthModal from "@/components/customModals/AuthModal";

export default function Home() {
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
