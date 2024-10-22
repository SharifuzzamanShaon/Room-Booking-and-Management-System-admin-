import React from "react";
import Link from "next/link";
import Heading from "@/utils/Heading";

const Dashboard = () => {
  return (
    <div>
      <Heading></Heading>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-blue-400">
          Welcome to the Dashboard
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
