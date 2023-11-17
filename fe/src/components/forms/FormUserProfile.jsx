import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalProvider } from "../../context/getContext";
import axios from "axios";

const FormUserProfile = () => {
  const { uploadFileCloudinary, dataUser } = useContext(GlobalProvider);

  const userCreatorUpdate = async (values) => {
    let finalBody = {};

    try {
      if (values) {
        let uploadImg;
        if (values.avatar) {
          uploadImg = await uploadFileCloudinary(
            "avatar",
            "userCreator",
            values.avatar
          );
        }
        if (values.password && values.avatar) {
          finalBody = {
            password: values.password,
            avatar: uploadImg,
          };
        } else if (values.password) {
          finalBody = {
            password: values.password,
          };
        } else if (values.avatar) {
          finalBody = {
            avatar: uploadImg,
          };
        }
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${dataUser.id}`,
        finalBody
        // {
        //   headers: {
        //     Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
        //   },
        // }
      );
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        avatar: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(8, "La password deve essere di almeno 8 caratteri")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La password deve contenere almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale"
          ),
        confirmPassword: Yup.string().when("password", {
          is: (password) => password && password.length > 0,
          then: () =>
            Yup.string()
              .oneOf([Yup.ref("password")], "Le password devono coincidere")
              .required("Conferma password è obbligatoria"),
          otherwise: () => Yup.string(),
        }),
        avatar: Yup.mixed().test(
          "fileFormat",
          "Invalid file format",
          (value) => {
            if (!value) {
              // Se il valore è vuoto, non eseguire i controlli successivi
              return true;
            }
            const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

            console.log(value.name, "consolelog del value immagine");

            // Se passa il required verifica anche il formato del file
            const fileExtension = value.name.split(".").pop().toLowerCase();
            return allowedExtensions.includes(fileExtension);
          }
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("valori", values);
        userCreatorUpdate(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex max-w-lg flex-col gap-3 mx-auto">
          <h3 className="text-center text-md font-semibold dark:text-white">
            Scegli la tua immagine profilo
          </h3>

          <div>
            <Label htmlFor="avatar" value="Carica la tua immagine profilo" />
          </div>
          <Field
            value={undefined}
            name="avatar"
            type="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={(e) => setFieldValue("avatar", e.currentTarget.files[0])}
          />
          <ErrorMessage
            className="text-red-500 text-sm mt-1"
            name="avatar"
            component="div"
          />

          <h3 className="text-center text-md font-semibold dark:text-white">
            Cambia la tua password
          </h3>

          <div>
            <Label htmlFor="password" value="Inserisci la tua nuova password" />
          </div>
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="Inserisci la password"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage
            className="text-red-500 text-sm mt-1"
            name="password"
            component="div"
          />

          <div>
            <Label
              htmlFor="confirmPassword"
              value="Conferma la tua nuova password"
            />
          </div>
          <Field
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Conferma la password"
            className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          <ErrorMessage
            className="text-red-500 text-sm mt-1"
            name="confirmPassword"
            component="div"
          />

          <Button
            type="submit"
            className="w-full mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Salva le informazioni
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormUserProfile;
