<<<<<<< HEAD:pages/password_reset.js
import React from "react";
import Footer from "./components/Footer";
import ForgotPwIcon from "../public/passwordPageImg/forgot_password.png";
=======
import React, { useState } from "react";
import Footer from "../components/Footer";
import ForgotPwIcon from "/home/akmal/Desktop/drc-syntrade/public/passwordPageImg/forgot_password.png?component";
import { HiEyeOff, HiEye } from "react-icons/hi";
>>>>>>> 68207b01901b12441a25c076bc0fd775138f13a7:pages/passwordPages/PasswordResetPage.js

const PasswordResetPage = () => {
  const [open, setOpen] = useState(false);

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        <div className="flex flex-col bg-[#ffffff]/80 h-5/6 rounded-lg space-y-4 shadow-xl items-center justify-start">
          <img src={ForgotPwIcon.src} className="h-1/4 w-1/6" />
          <h1 className="text-black text-center text-4xl">Password Reset</h1>
          <p className="text-gray-600 text-center text-lg">
            Must be at least 8 characters
          </p>

          <form
            action="#"
            method="POST"
            className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
          >
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type={open === false ? "password" : "text"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <div className="text-xl absolute">
                  {open === false ? (
                    <HiEye onClick={toggle} />
                  ) : (
                    <HiEyeOff onClick={toggle} />
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="password"
                  type={open === false ? "password" : "text"}
                  autoComplete="current-password"
                  placeholder="Re-enter password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                <div className="text-xl absolute">
                  {open === false ? (
                    <HiEye onClick={toggle} />
                  ) : (
                    <HiEyeOff onClick={toggle} />
                  )}
                </div>
              </div>
            </div>

            <div className="text-center justify-center">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-10"
              >
                Reset password
              </button>

              <a
                href="/home/akmal/Desktop/drc-syntrade/pages/LoginPage.js"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
              >
                Back to login
              </a>
            </div>
          </form>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PasswordResetPage;
