"use client";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { style } from "../../utils/styles";
import { Button, FormHelperText, Input, InputLabel } from "@mui/material";
import { BiHide, BiShow } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";
import { useGlobalContext } from "../../../ContextAPI/GlobalContext";
import { useRouter } from "next/navigation";

const LoginModule = ({ route, setRoute, setAuthModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        values,
        config
      );
      if (
        response.data?.success === true &&
        response.data?.user.role === "admin"
      ) {
        toast.success("Login Success");
        setAuthModal(false);
        dispatch({ type: "SET_USER", payload: response.data });
        router.push("/dashboard");
      } else {
        toast.error("You are not authorized");
        return;
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
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
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            type="email"
            className={" text-white"}
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email-helper-text"
            required
          />
          <FormHelperText
            id="email-helper-text"
            className=" text-white"
          ></FormHelperText>
        </FormControl>
        <div>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password" className=" text-white" place>
              Password
            </InputLabel>
            <Input
              type={`${showPassword ? "text" : "password"}`}
              className=" text-white relative"
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
              className=" text-white"
            ></FormHelperText>
          </FormControl>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <p className=" text-black">
          Don't have account ?{" "}
          <span
            className="hyper cursor-pointer text-blue-800 dark:border-b-slate-100 border-b border-blue-800"
            onClick={() => setRoute("signUp")}
          >
            {"  "} Sign-up
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginModule;