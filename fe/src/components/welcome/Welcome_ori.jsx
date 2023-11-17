import React, { useState } from "react";

const Welcome = () => {
  const [register, setRegister] = useState(false);

  return (
    /* <div className="w-full h-screen bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 flex justify-center items-center">
      <div className="w-4/5 aspect-square md:h-4/6 bg-white grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[url('https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-cover bg-center"></div>
        <div>ciaoooo</div>
      </div>
    </div>*/
    <section className="bg-blend-multiply bg-no-repeat bg-cover bg-slate-500 lg:bg-white bg-[url('https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] lg:bg-none w-full min-h-screen flex justify-center items-center">
      <div
        id="container"
        className="w-4/5 lg:h-4/5 flex justify-center items-center"
      >
        <div className="hidden lg:block w-1/2 h-full bg-[url('https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]"></div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-between w-4/5">
            {" "}
            <h1 className="text-2xl font-extrabold text-slate-100 text-center my-6">
              TATTOOME
            </h1>
            <button
              onClick={() => setRegister(false)}
              className="text-white bg-slate-900 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <button
              onClick={() => setRegister(true)}
              className="text-white bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
          </div>

          {!register ? (
            <form>
              <div className="mb-6">
                <label
                  for="email-address-icon"
                  className="text-white block mb-2 text-sm font-medium dark:text-white"
                >
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    className="bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="password"
                  className="text-white block mb-2 text-sm font-medium dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50/10 hover:bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <button className="w-full text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </form>
          ) : (
            <form>
              <div className="mb-6">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Insert your name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="lanstName"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Insert your last name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="email-address-icon"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    className="bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="repeat-password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="terms"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register new account
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
