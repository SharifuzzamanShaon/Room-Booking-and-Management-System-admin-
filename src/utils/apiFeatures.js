// utils/api.js

import axios from "axios";

export const fetchRooms = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-rooms`,
      config
    ); // Adjust the URL as needed

    return response;
    // Assuming the response is a JSON object containing the room data
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
