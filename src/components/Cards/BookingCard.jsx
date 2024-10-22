"use client";
import axios from "axios";
import Image from "next/image"; 
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const BookingCard = ({
  booking,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  onUpdate,
}) => {
  const { room, user, startDateGMT, endDateGMT, status, _id } = booking;
  const [currentStatus, setCurrentStatus] = useState(status);
  useEffect(() => {
    if (isEditing) {
      setCurrentStatus(status);
    }
  }, [isEditing, status]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/booking-status/${_id}`,
        { status: currentStatus },
        config
      );
      if (response.data?.success) {
        onUpdate();
        toast.success("Status updated");
      }
      setIsEditing(false);
    } catch (error) {
      if (error) {
        toast.error("Something wnet wrong");
      }
    }
  };
  const handleDeleteBooking = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/booking/delete/${_id}`,
        config
      );
      if (response.data?.success) {
        onUpdate();
        toast.success("Booking is deleted");
      }
      setIsEditing(false);
    } catch (error) {
      if (error) {
        
        toast.error("Something wnet wrong");
      }
    }
  };
  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Link href={`/room-details/${room._id}`}>
        <Image
          src={room.picture}
          width={400} 
          height={300} 
          className="rounded-t-lg object-cover"
          alt={room.title}
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {room.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Check-in: {startDateGMT}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Check-out: {endDateGMT}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Status:{" "}
          <span
            className={`font-bold ${
              status === "booked"
                ? "text-green-600"
                : status === "expired"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </span>
        </p>
        {user && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            User: {user.name}
          </p>
        )}
        <ul className="mb-3 text-gray-600 dark:text-gray-300">
          {room.facilities.map((facility, index) => (
            <li key={index} className="text-sm">
              - {facility}
            </li>
          ))}
        </ul>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="mb-4">
            <select
              name="status"
              defaultValue={status}
              onChange={(e) => handleStatusChange(e)}
              className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
            >
              <option value="booked">Booked</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between mt-4">
            <Link
              href={`/room-details/${room._id}`}
              className="inline-flex items-center px-3 py-2 mr-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
            >
              Edit Status
            </button>
            <button
              onClick={handleDeleteBooking}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
