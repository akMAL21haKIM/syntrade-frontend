import React, { useState } from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import Link from "next/link";
import { isEmailValid } from "../lib/input_validations";
import { ForgotPasswordIllustration } from "../lib/illustrations";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);

  // TODO: Forgot password
  const handleForgotPassword = (e) => {
    // Find user by email
    // If email exists in database, generate a random password to user
    // Update user's password with newly generated random password
    // Send email to user with link to password reset page

    e.preventDefault();
    setShowEmailError(false);

    console.log(`email: ${email}`);

    const emailValidity = isEmailValid(email);

    // Show email error if email is invalid
    if (!emailValidity) {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }

    // Check if email is valid
    if (emailValidity) {
      // Use GraphQL signup mutation to perform sign up
      // If email already exists in database, display modal to user saying
      // an account has already been created with the email address
      // Navigate to trade page
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#ffffff]/80 h-screen">
          <div className="flex flex-col rounded-lg space-y-4 items-center justify-start">
            <ForgotPasswordIllustration className="w-80 h-80" />

            <h1 className="text-black text-center text-4xl">
              Forgot password?
            </h1>
            <p className="text-gray-600 text-center text-lg">
              Don&apos;t worry. We&apos;ll send you reset instructions.
            </p>

            <form
              action="#"
              method="POST"
              className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
            >
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter email"
                    required
                    className="placeholder:normal-case lowercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div
                  style={{ display: showEmailError ? "block" : "none" }}
                  className="mt-0"
                >
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#DC2626"
                      className="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div className="text-sm text-red-600 px-2 font-medium">
                      Invalid Email
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center justify-center">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mb-2 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleForgotPassword}
                >
                  Submit
                </button>

                <Link
                  href="login"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 text-center pt-4"
                >
                  Back to login page
                </Link>
              </div>
            </form>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
