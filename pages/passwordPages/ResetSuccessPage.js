import React from "react";
import Footer from "../components/Footer";
import { TiTick } from "react-icons/ti";

const ResetSuccessPage = () => {
  return (
    <div className="min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        <div className="flex flex-col bg-[#ffffff]/80 h-5/6 rounded-lg space-y-4 shadow-xl items-center justify-start">
          <TiTick className="h-1/3 w-1/3 text-green-500 mt-20" />
          <h1 className="text-black text-center text-4xl">Password Reset</h1>
          <p className="text-gray-600 text-center text-lg">
            Your password has been successfully reset
          </p>

          <form
            action="#"
            method="POST"
            className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
          >
            <div className="text-center justify-center">
              <a
                href="/home/akmal/Desktop/drc-syntrade/pages/LoginPage.js"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-center mt-10"
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

export default ResetSuccessPage;
