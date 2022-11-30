import { React, useState, useEffect } from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import Link from "next/link";
import NavBar from "./components/NavBar";
import { SkeletonLoaderProfilePage } from "./components/SkeletonLoaders";

const Profile = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Profile | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <NavBar></NavBar>
        {loader ? (
          <SkeletonLoaderProfilePage />
        ) : (
          <div className="flex justify-center items-center w-full mt-12">
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
                  <Link
                    href="/reset_password"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-7 py-3 text-base font-medium text-white hover:bg-indigo-700"
                  >
                    Change password
                  </Link>
                </div>
                <div className="ml-3 inline-flex">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-7 py-3 text-base font-medium text-white hover:bg-red-600"
                  >
                    Delete account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Profile;
