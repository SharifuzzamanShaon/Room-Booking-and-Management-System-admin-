"use client";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { BiHide, BiShow } from "react-icons/bi";
import toast from "react-hot-toast";
import { Button, FormHelperText, Input, InputLabel } from "@mui/material";
import axios from "axios";

const SignUpModule = ({ setAuthModal, setRoute }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {}, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!values.name) {
        toast.error("Name is required");
        return;
      }
      if (!values.email) {
        toast.error("Insert email");
        return;
      }
      if (!values.password) {
        toast.error("Insert password");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        values,
        config
      );
      if (response.data?.success === true) {
        toast.success("Register Success | Please Login");
        setRoute("login");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 max-w-md mx-auto font-Poppins bg-white"
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="name" className="text-white">
            Name
          </InputLabel>
          <Input
            type="text"
            className={"text-white"}
            id="name"
            value={values.name}
            onChange={handleChange}
            aria-describedby="name-helper-text"
            required
          />
          <FormHelperText
            id="name-helper-text"
            className="text-white"
          ></FormHelperText>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            type="email"
            className={"text-white"}
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email-helper-text"
            required
          />
          <FormHelperText
            id="email-helper-text"
            className="text-white"
          ></FormHelperText>
        </FormControl>
        <div>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password" className="text-white" place>
              Password
            </InputLabel>
            <Input
              type={`${showPassword ? "text" : "password"}`}
              className="text-white relative"
              id="password"
              value={values.password}
              onChange={handleChange}
              aria-describedby="password-helper-text"
              required
            />
            {showPassword ? (
              <BiShow
                size={22}
                className="absolute bottom-[42px] right-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BiHide
                size={22}
                className="absolute bottom-[42px] right-2"
                onClick={() => setShowPassword(true)}
              />
            )}

            <FormHelperText
              id="password-helper-text"
              className="text-white"
            ></FormHelperText>
          </FormControl>
        </div>
        <div className="w-full mt-5">
          <Button type="submit" variant="contained" color="primary">
            Sign-Up
          </Button>
        </div>
        <div className="flex items-center justify-center"></div>
        <p className="text-black">
          Already have account ?{" "}
          <span
            className="hyper cursor-pointer text-blue-800 dark:border-b-slate-100 border-b border-blue-800"
            onClick={() => setRoute("login")}
          >
            Login
          </span>
        </p>
      </form>
    </>
  );
};

export default SignUpModule;
