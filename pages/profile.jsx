import React from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import SideNavBar from "./components/NavBar";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full flex justify-between">
        {/* Side navigation bar */}
        <SideNavBar />

        <div className="flex justify-center items-center w-full">
          <div className="text-center">
            <span className="inline-block h-24 w-24 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <p className="text-base pt-4 font-semibold text-gray-500">
              Joined on June 2022
            </p>

            <div className="space-y-2 pt-8 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 text-left"
              >
                Your email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // placeholder="user@example.com"
                  required
                  className="placeholder:normal-case select-none lowercase block w-full appearance-none rounded-md border-2 font-medium border-gray-200 px-3 py-2 text-gray-400 placeholder-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  disabled
                  defaultValue="user@example.com"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/reset_password"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-7 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Change password
                </a>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-7 py-3 text-base font-medium text-white hover:bg-red-600"
                >
                  Delete account
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex items-right py-6 w-36 text-base font-medium text-indigo-600">
          <p className="text-base font-semibold text-indigo-600 mr-2">
            Log out
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
