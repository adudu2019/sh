import React from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const { user, logout, username, role } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await logout();
      if (!error) {
        alert("Berhasil Logout");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {role === "admin" ? (
        <>
          <div className="card h-80 w-full bg-slate-500 rounded-none">
            <h2 className="text-white text-2xl font-black text-center mt-5">
              Profile
            </h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
              className="object-cover mx-16 mt-5 shadow-2xl h-96"
            />
            <div className="text-center mt-4">
              <h2 className="text-white text-2xl font-black">
                Hai Admin! {username}
              </h2>
              <div className="lg:flex lg:flex-row flex-col lg:gap-24 gap-4 justify-center mt-5">
                <div>
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="dhiyaulhaq2097@gmail.com"
                    className="text-center bg-gray-50 border p-2.5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    No telp
                  </label>
                  <input
                    type="text"
                    placeholder="0858-8078-6613"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div className="">
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Duta Mekar Asri Blok P1 No 41"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
              </div>

              <button
                className="border mt-6 p-2 text-white hover:bg-slate-500 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                className="ms-3 border mt-6 p-2 text-white hover:bg-slate-500 rounded-md"
                onClick={() => navigate("/admin")}
              >
                Admin
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card h-80 w-full bg-slate-500 rounded-none">
            <h2 className="text-white text-2xl font-black text-center mt-5">
              Profile
            </h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jefri_Nichol_in_2019.png/220px-Jefri_Nichol_in_2019.png"
              className="object-cover mx-16 mt-5 shadow-2xl h-96"
            />
            <div className="text-center mt-4">
              <h2 className="text-white text-2xl font-black">
                Hai ! {username}
              </h2>
              <div className="gap-24 justify-center mt-5">
                <div>
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="dhiyaulhaq2097@gmail.com"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div className="">
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    No telp
                  </label>
                  <input
                    type="text"
                    placeholder="0858-8078-6613"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <div className="">
                  <label className="block mb-2 text-sm w-64 font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Duta Mekar Asri Blok P1 No 41"
                    className="text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
              </div>

              <button
                className="border mt-6 p-2 text-white hover:bg-slate-500 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                className="ms-3 border mt-6 p-2 text-white hover:bg-slate-500 rounded-md"
                onClick={() => navigate("/history")}
              >
                History Pesanan
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;
