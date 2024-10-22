"use client";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateRoomModule = ({ setRoute, setAuthModal }) => {
  const [preview, setPreview] = useState("");
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    rent: 0,
    facilities: "",
    picture: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleFacilitiesChange = (e) => {
    const { value } = e.target;
    setValues({ ...values, facilities: value.split(",") });
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValues((prevValues) => ({
          ...prevValues,
          picture: reader.result, // Set the base64 data URL to the picture state
        }));
      };
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview state to the Data URL
      };

      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setPreview(""); // Clear the preview
    setValues((prevValues) => ({
      ...prevValues,
      picture: "", // Clear the picture state
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Input validations
      if (!values.title || !values.rent || !values.facilities.length) {
        toast.error("Please fill in all fields");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/create-room`,
        values,
        config
      );

      if (response.data?.success) {
        toast.success("Room created successfully");
        setValues({
          title: "",
          rent: 0,
          facilities: "",
          picture: "",
        });
      } else {
        toast.error("Error creating room");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-md mx-auto font-Poppins bg-white rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Create New Room:</h3>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="title">Room Title</InputLabel>
        <Input
          type="text"
          id="title"
          value={values.title}
          onChange={handleChange}
          required
        />
        <FormHelperText></FormHelperText>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="rent">Rent Amount</InputLabel>
        <Input
          type="number"
          id="rent"
          value={values.rent}
          onChange={handleChange}
          required
        />
        <FormHelperText></FormHelperText>
      </FormControl>

      <TextField
        fullWidth
        label="Facilities (comma separated)"
        id="facilities"
        value={values.facilities}
        onChange={handleFacilitiesChange}
        variant="outlined"
        required
      />

      {/* Custom file upload button */}
      <div className="relative">
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer inline-block py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
        >
          Choose Picture
        </label>
        <input
          type="file"
          id="avatar-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      {preview && (
        <>
          <Image
            src={preview}
            alt="Avatar Preview"
            width={160}
            height={160}
            className="object-cover"
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={removeImage} // Remove image
            className="mt-2"
          >
            Remove Image
          </Button>
        </>
      )}
      <Button type="submit" variant="contained" color="primary">
        Create Room
      </Button>

      <p></p>
    </form>
  );
};

export default CreateRoomModule;
