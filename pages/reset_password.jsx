import { React, useState } from "react";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
import { ResetPasswordIllustration } from "../lib/illustrations";
import { EyeIcon, EyeSlashIcon } from "../lib/icons";

const ResetPassword = () => {
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  // Show or hide password
  const togglePassword = () => {
    setOpenPassword(!openPassword);
  };

  // Show or hide confirm password
  const toggleConfirmPassword = () => {
    setOpenConfirmPassword(!openConfirmPassword);
  };

  // Check whether password is valid or not
  const isPasswordValid = () => {
    // Password must be between 8-12 characters
    // Password must have at least:
    // 1 capital letter, 1 lowercase letter, 1 digit and 1 special characters (~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/)
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    // Check if password is empty or not
    if (!password) {
      console.log("Error: Password cannot be empty");
      setShowPasswordError(true);
      return false;
    }

    // Check if length of password is between 8-12 characters or not
    if (password.length < 8 || password.length > 12) {
      console.log("Error: Password must be between 8-12 characters");
      setShowPasswordError(true);
      return false;
    }

    // Check if password contains any whitespace or not
    if (/\s/.test(password)) {
      console.log("Error: Password cannot contain spaces");
      setShowPasswordError(true);
      return false;
    }

    // Check if password have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character
    if (!pattern.test(password)) {
      console.log(
        "Error: Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"
      );
      setShowPasswordError(true);
      return false;
    }

    return true;
  };

  // Check whether password and confirm password matches or not
  const doesPasswordsMatch = () => {
    // Check if password matches confirmPassword or not
    if (password !== confirmPassword) {
      console.log("Error: Password and Confirm Password does not match");
      setShowConfirmPasswordError(true);
      return false;
    }
    return true;
  };

  // TODO: Reset user password
  const handleResetPassword = (e) => {
    e.preventDefault();
    setShowPasswordError(false);
    setShowConfirmPasswordError(false);

    console.log(`password: ${password}`);
    console.log(`confirmPassword: ${confirmPassword}`);

    const passwordValidity = isPasswordValid() && doesPasswordsMatch();

    // Check if password and confirm password are valid
    if (passwordValidity) {
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div id="main" className="min-h-full">
        <div
          id="background_panel"
          className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#A6A6E0] h-screen"
        >
          <div
            id="form_panel"
            className="flex flex-col bg-[#ffffff]/80 h-5/6 rounded-lg space-y-4 shadow-xl items-center justify-start"
          >
            <ResetPasswordIllustration />
            <h1 className="text-black text-center text-4xl">Password Reset</h1>
            <p className="text-gray-600 text-center text-lg">
              Must be at least 8 characters
            </p>

            <form
              id="reset_password"
              action="#"
              method="POST"
              className="space-y-6 mx-auto w-full max-w-sm lg:w-96"
            >
              <div id="password_container" className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div id="password_field" className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={openPassword === false ? "password" : "text"}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <div
                    id="visibility"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {openPassword === false ? (
                      <EyeIcon
                        fill="currentColor"
                        className="w-4 h-4"
                        id="eye_icon_opened"
                        onClick={togglePassword}
                      />
                    ) : (
                      <EyeSlashIcon
                        fill="currentColor"
                        className="w-4 h-4"
                        id="eye_icon_closed"
                        onClick={togglePassword}
                      />
                    )}
                  </div>
                </div>
                <div
                  id="password_error"
                  className="rounded border-gray-300 border px-2 py-2"
                  style={{ display: showPasswordError ? "block" : "none" }}
                >
                  <div id="password_image_error" className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#DC2626"
                      className="w-5 h-5"
                      id="error"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div
                      id="invalid_password_msg"
                      className="text-sm text-red-600 px-2 font-medium"
                    >
                      Invalid Password
                    </div>
                  </div>
                  <div
                    id="warning_container"
                    className="text-sm text-red-600 px-12 font-medium"
                  >
                    <ul className="list-disc">
                      <li>
                        Your password needs to include both lower case & upper
                        case
                      </li>
                      <li>At least one number or symbol</li>
                      <li>Minimum of 8 and maximum of 12 characters</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="confirm_password_container" className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div id="confirm_password_field" className="mt-1 relative">
                  <input
                    id="confirm_password"
                    name="confirm-password"
                    type={openConfirmPassword === false ? "password" : "text"}
                    autoComplete="current-password"
                    placeholder="Re-enter password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <div
                    id="visibility"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {openConfirmPassword === false ? (
                      <EyeIcon
                        fill="currentColor"
                        className="w-4 h-4"
                        id="eye_icon_opened"
                        onClick={toggleConfirmPassword}
                      />
                    ) : (
                      <EyeSlashIcon
                        fill="currentColor"
                        className="w-4 h-4"
                        id="eye_icon_closed"
                        onClick={toggleConfirmPassword}
                      />
                    )}
                  </div>
                </div>
                <div
                  id="confirm_password_error"
                  style={{
                    display: showConfirmPasswordError ? "block" : "none",
                  }}
                >
                  <div id="visibility" className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#DC2626"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div
                      id="invalid_confirm_password_msg"
                      className="text-sm text-red-600 px-2 font-medium"
                    >
                      Password and Confirm Password does not match
                    </div>
                  </div>
                </div>
              </div>

              <div id="button-container" className="text-center justify-center">
                <button
                  id="submit"
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-md font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-10"
                  onClick={handleResetPassword}
                >
                  Reset password
                </button>

                <Link
                  href="login"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 text-center"
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

export default ResetPassword;
