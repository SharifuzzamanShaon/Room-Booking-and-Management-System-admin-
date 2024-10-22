"use client";
import Image from "next/image";
import RoomCard from "./Cards/RoomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DisplayRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [updateRooms, setUpdateRooms] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllRoom();
  }, [updateRooms, refresh]);

  const getAllRoom = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-rooms`,
        config
      ); 
      setRooms(response.data.rooms);
    } catch (error) {
      if(error){
        toast.error("Somthing went wrong")
      }
    }
  };
  const handleRoomUpdate = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Available Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} onUpdate={handleRoomUpdate} />
        ))}
      </div>
    </div>
  );
};

export default DisplayRooms;
