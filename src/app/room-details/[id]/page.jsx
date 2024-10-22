"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RoomDetails = ({ params }) => {
  const [RoomDetails, setRoomDetails] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const { id } = params; 

  useEffect(() => {
    getRoomDetails();
  }, [id]);
  const getRoomDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get-room-details-&-status/${id}`,
      config
    ); 
    setRoomDetails(response.data.room);
    setBookingStatus(response.data.bookingDetails);
  };
  if (!RoomDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center lg:flex-row lg:items-start gap-8 relative">
      <div className=" top-4 left-4 z-10 mb-5">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-full hover:bg-gray-800 shadow-lg"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>

      <div className="w-full lg:max-w-4xl flex flex-col lg:flex-row items-center lg:items-start gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative z-0">
        <div className="flex-shrink-0">
          <Image
            src={RoomDetails?.picture}
            alt={RoomDetails?.title}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="flex-grow text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {RoomDetails?.title}
          </h1>
          <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
            Price:{" "}
            <span className="text-green-600 dark:text-green-400">
              ${RoomDetails?.price}
            </span>
          </p>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Description:
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            This room offers comfortable living space with all essential
            facilities and a beautiful view.
          </p>
          <div className="flex items-center justify-center">
            <div className="text-lg font-medium">
              <h2 className="text-xl font-semibold mb-4">Status: </h2>
              <div className="flex items-center space-x-2 bg-orange-400 p-2 my-4">
                {bookingStatus?.status === "booked" ? (
                  <>
                    <span className="text-white-300">
                      Available after: {bookingStatus?.endDate}
                    </span>
                  </>
                ) : (
                  <span className="text-white-50">Available Now</span>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-2">Facilities:</h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {RoomDetails?.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full"
                  >
                    {facility}
                  </span>
                ))}
              </div>
              <div className="my-3">
                <Link
                  href={`/checkout/id=${RoomDetails._id}${
                    bookingStatus
                      ? `&availableAfter=${encodeURIComponent(
                          bookingStatus.endDate
                        )}`
                      : ""
                  }`}
                >
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
