import React, { useState } from "react";
import FormLogin from "../forms/FormLogin";
import FormRegisterUser from "../forms/FormRegisterUser";

const Welcome = () => {
  const [register, setRegister] = useState(false);

  return (
    // <section className="absolute z-10 top-0 bg-blend-multiply bg-no-repeat bg-cover bg-slate-500 lg:bg-white bg-[url('https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] lg:bg-none w-full min-h-screen flex justify-center items-center">
    <section className="absolute z-10 top-0 w-full min-h-screen bg-transparent flex justify-center items-center">
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

          {!register ? <FormLogin /> : <FormRegisterUser />}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
