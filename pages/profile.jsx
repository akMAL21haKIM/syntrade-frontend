import { React, useState, useEffect } from "react";
import Head from "next/head";
import { SkeletonLoaderProfilePage } from "../components/SkeletonLoaders";
import Modal from "../components/Modal";

const Profile = () => {
  const [loader, setLoader] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

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

      <main id="profile_main">
        {loader ? (
          <SkeletonLoaderProfilePage />
        ) : (
          <>
            <Modal
              id="modal-change-password"
              openModal={openChangePasswordModal}
              setOpenModal={setOpenChangePasswordModal}
              modalTitle="Change Password"
              modalDescription="Change here"
            />
            <Modal
              id="modal-delete-account"
              openModal={openDeleteAccountModal}
              setOpenModal={setOpenDeleteAccountModal}
              modalTitle="Delete Account"
              modalDescription="Are you sure you want to deactivate your account? All of
                        your data will be permanently removed from our servers
                        forever. This action cannot be undone."
            />
            <div
              id="profile_container"
              className="flex items-center justify-center my-24 w-full pr-5 pl-5"
            >
              <div id="profile_subcontainer" className="text-center">
                <span
                  id="profile_avatar_space"
                  className="inline-block h-24 w-24 overflow-hidden rounded-full bg-gray-100"
                >
                  <svg
                    id="profile_avatar"
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

                <div id="email_container" className="space-y-2 pt-8 w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 text-left"
                  >
                    Your email
                  </label>
                  <div id="email_field" className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="yourname@domain.com"
                      required
                      className="placeholder:normal-case select-none lowercase block w-full appearance-none rounded-md border-2 font-medium border-gray-200 px-3 py-2 text-gray-400 placeholder-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      disabled
                    />
                  </div>
                </div>

                <div
                  id="buttons_container"
                  className="mt-8 flex justify-center"
                >
                  <button
                    id="button_change_password"
                    className="inline-flex shadow rounded-md border border-transparent bg-indigo-600 px-7 py-3 hover:bg-indigo-700"
                    onClick={(e) => setOpenChangePasswordModal(true)}
                  >
                    <p className="inline-flex items-center justify-center text-base font-medium text-white">
                      Change password
                    </p>
                  </button>

                  <button
                    id="button_delete_account"
                    className="ml-3 inline-flex rounded-md border border-transparent bg-rose-600 px-7 py-3 hover:bg-rose-700"
                    onClick={(e) => setOpenDeleteAccountModal(true)}
                  >
                    <p className="inline-flex items-center justify-center text-base font-medium text-white">
                      Delete account
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Profile;
