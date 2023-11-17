import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalProvider } from "../../context/getContext";

const FormRegisterUser = () => {
  const { registerUser } = useContext(GlobalProvider);

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        alias: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Il nome è obbligatorio"),
        lastName: Yup.string().required("Il cognome è obbligatorio"),
        alias: Yup.string().nullable(),
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
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Le password devono coincidere")
          .required("Conferma password è obbligatoria"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // newPost(values);
        registerUser(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="flex max-w-lg flex-col gap-4 mx-auto">
        <div>
          <Label htmlFor="name" value="Nome" />
          <Field
            type="text"
            name="name"
            id="name"
            placeholder="Inserisci il tuo Nome"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <Label htmlFor="lastName" value="Cognome" />
          <Field
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Inserisci il tuo Cognome"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage name="lastName" component="div" />
        </div>

        <div>
          <Label htmlFor="alias" value="Alias" />
          <Field
            type="text"
            name="alias"
            id="alias"
            placeholder="Inserisci il tuo Alias"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage name="lastName" component="div" />
        </div>

        <div>
          <Label htmlFor="email" value="Inserisci la tua mail" />
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
              className="bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <Label htmlFor="password" value="Inserisci la tua password" />
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Inserisci la password"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage name="password" component="div" />
        </div>

        <div>
          <Label htmlFor="confirmPassword" value="Conferma la tua password" />
          <Field
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Conferma la password"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage name="confirmPassword" component="div" />
        </div>
        <Button
          type="submit"
          className="w-full mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </Button>
      </Form>
    </Formik>
  );
};

export default FormRegisterUser;
