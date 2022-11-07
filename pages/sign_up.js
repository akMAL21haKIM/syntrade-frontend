import React, { useState } from "react";
import CarouselSignUp from "./components/CarouselSignUp";
import { HiEyeOff, HiEye } from "react-icons/hi";

const SignUp = () => {
  const [open, setOpen] = useState(false);

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="grid grid-cols-2 divide-x-2 min-h-full">
      {/* Carousel slider */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        <div className="flex bg-[#ffffff]/80 h-5/6 rounded-lg shadow-xl">
          <CarouselSignUp></CarouselSignUp>
        </div>
      </div>

      {/* Sign up form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white h-screen">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl text-center font-bold tracking-tight text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/home/akmal/Desktop/drc-syntrade/pages/LoginPage.js"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div></div>

            <div className="mt-6 relative">
              <form action="#" method="POST" className="space-y-7">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 relative"
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

                <div className="space-y-1 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 relative"
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
                      className=" w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

                <div className="flex items-center justify-between">
                  <h1>reCapcha</h1>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
