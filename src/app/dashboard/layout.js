"use client";
import AdminLayout from "@/components/AdminComponents/AdminSidebar";
import Header from "@/components/Header";
import Protected from "@/hooks/useProtected";
import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Protected>
        <Header />
        <AdminLayout>{children}</AdminLayout>
      </Protected>
    </div>
  );
};

export default Layout;