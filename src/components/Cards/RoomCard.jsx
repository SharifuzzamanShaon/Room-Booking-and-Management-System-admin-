import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RoomCard = ({ room, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState({ ...room });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoom((prev) => ({ ...prev, [name]: value }));
  };

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
        `${process.env.NEXT_PUBLIC_API_URL}/admin/update-room/${room._id}`,
        updatedRoom,
        config
      );

      if (response.data?.success) {
        onUpdate(); // Refresh the room list
        handleCancelEdit(); // Exit editing mode
        toast.success("Room updated successfully");
      } else {
        toast.error("Error updating room");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating room");
    }
  };

  const handleCancelEdit = () => {
    setUpdatedRoom({ ...room }); // Reset to original data
    setIsEditing(false); // Close editing mode
  };

  const handleDeleteRoom = async () => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        const config = {
          withCredentials: true,
        };

        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/delete/${room._id}`,
          config
        );

        if (response.data?.success) {
          toast.success("Room deleted successfully");
          onUpdate(); // Refresh the room list
        } else {
          toast.error("Error deleting room");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete room");
      }
    }
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
          Rent: ${room.rent}
        </p>
        <ul className="mb-3 text-gray-600 dark:text-gray-300">
          {room.facilities.map((facility, index) => (
            <li key={index} className="text-sm">
              - {facility}
            </li>
          ))}
        </ul>

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="mb-4">
            <input
              type="text"
              name="title"
              value={updatedRoom.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
              required
            />
            <input
              type="number"
              name="rent"
              value={updatedRoom.rent}
              onChange={handleEditChange}
              placeholder="Rent"
              className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
              required
            />
            <textarea
              name="facilities"
              value={
                Array.isArray(updatedRoom.facilities)
                  ? updatedRoom.facilities.join(", ")
                  : updatedRoom.facilities || ""
              }
              onChange={handleEditChange}
              placeholder="Facilities (comma-separated)"
              className="block w-full p-2 mb-2 border border-gray-300 rounded text-black"
              required
            />
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
              className="inline-flex items-center px-3 py-2 mr-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteRoom}
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

export default RoomCard;
