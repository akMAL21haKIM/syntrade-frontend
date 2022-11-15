import React from "react";
import Footer from "./components/Footer";

const CheckEmail = () => {
  return (
    <div className="min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen">
        <div className="flex flex-col bg-[#ffffff]/80 h-5/6 rounded-lg space-y-4 shadow-xl items-center justify-center">
          {/* <img src={CheckEmailIcon.src} className="h-1/12 w-1/12" /> */}
          <h1 className="text-black text-center text-4xl">Check your email</h1>
          <p className="text-gray-600 text-center text-lg">
            We have sent instructions to reset your password to your email
          </p>

          <form
            action="#"
            method="POST"
            className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
          >
            <div className="text-center justify-center">
              <a
                href="login"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
              >
                Back to login
              </a>

              <p className="mt-12 text-md text-center text-gray-600">
                Didn&apos;t receive the link?&nbsp;
                <a
                  href="login"
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Resend
                </a>
              </p>
            </div>
          </form>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CheckEmail;
