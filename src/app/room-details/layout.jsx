
import Header from "@/components/Header";
import React from "react";

const RoomDetailsLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <h1 className="text-xl font-bold">Room Details</h1>
      <main>{children}</main>
    </div>
  );
};

export default RoomDetailsLayout;
