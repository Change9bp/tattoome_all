import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalProvider } from "../../context/getContext";
import "./formGeneral.css";

const FormLogin = () => {
  const { loginUser } = useContext(GlobalProvider);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Inserisci un indirizzo email valido")
          .required("L'indirizzo email è obbligatorio"),
        password: Yup.string()
          .min(8, "La password deve essere di almeno 8 caratteri")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La password deve contenere almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale"
          )
          .required("La password è obbligatoria"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // newPost(values);
        loginUser(values);
      }}
    >
      <Form className="flex max-w-lg flex-col gap-4 mx-auto mb-10">
        <div>
          <Label
            htmlFor="email"
            value="Inserisci la tua mail"
            className="text-white shadow-text"
          />
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
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Inserisci l'indirizzo email"
              className="shadow-md shadow-black bg-gray-50/50 placeholder-black hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            />
          </div>
          <ErrorMessage className="text-red-500" name="email" component="div" />
        </div>

        <div>
          <Label
            htmlFor="password"
            value="Inserisci la tua password"
            className="text-white shadow-text"
          />
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Inserisci la password"
            className="shadow-md shadow-black bg-gray-50/50 placeholder-black hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
          <ErrorMessage
            className="text-red-500"
            name="password"
            component="div"
          />
        </div>
        <Button
          type="submit"
          className=" shadow-md shadow-black w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Entra nella community
        </Button>
      </Form>
    </Formik>
  );
};

export default FormLogin;
