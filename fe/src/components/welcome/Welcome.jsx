import React, { useContext } from "react";
import FormLogin from "../forms/FormLogin";
import FormRegisterUser from "../forms/FormRegisterUser";
import { Button } from "flowbite-react";
import { GlobalProvider } from "../../context/getContext";
import "./welcome.css";

const Welcome = () => {
  const { register, setRegister } = useContext(GlobalProvider);

  return (
    <section className="absolute z-10 top-0 w-full min-h-screen bg-transparent flex justify-center items-center">
      <div className="w-4/5  flex justify-center items-center">
        <div className="w-full lg:w-1/2 shadow-text rounded-3xl">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-slate-100 text-center my-6">
              TATTOOME
            </h1>
            <div className="w-full flex justify-center gap-4">
              <Button
                className="shadow-md shadow-black"
                onClick={() => setRegister(!register)}
              >
                Login
              </Button>
              <Button
                className="shadow-md shadow-black"
                onClick={() => setRegister(!register)}
              >
                Register
              </Button>
            </div>
          </div>

          {!register ? <FormLogin /> : <FormRegisterUser />}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
