"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "./Cards/BookingCard";

const Displaybookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updateRooms, setUpdateRooms] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllBooking();
  }, [updateRooms, refresh]);

  const getAllBooking = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/get-all-booking`,
        config
      ); 
      setBookings(response?.data);
    } catch (error) {
      if (error) {
        toast.error("Somthing went wrong");
      }
    }
  };



  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentBooking(null);
  };
  const handleBookingUpdate = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookings?.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleCancelEdit={handleCancelEdit}
            onUpdate={handleBookingUpdate}
          ></BookingCard>
        ))}
      </div>
    </div>
  );
};

export default Displaybookings;
