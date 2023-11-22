import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { styles } from "../../data/tabelleDropdown";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalProvider } from "../../context/getContext";

const ModifyPost = ({ _id, title, content, tattooStyle }) => {
  const { uploadFileCloudinary, alert, setAlert } = useContext(GlobalProvider);
  const navigate = useNavigate();

  const patchTattooPost = async (values) => {
    let finalBody = {};
    if (values.cover) {
      const uploadCover = await uploadFileCloudinary(
        "cover",
        "tattooPost",
        values.cover
      );
      finalBody = {
        ...values,
        cover: uploadCover,
      };
    }
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${_id}`,
        values.cover ? finalBody : values,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      console.log("modify post", response);
      if (response.status === 200 && response.statusText === "OK") {
        setAlert("Commento correttamente modificato");
        setTimeout(() => {
          setAlert("");
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.response);
      setAlert("Errore nel caricamento dei dati riprova più tardi");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  return (
    <>
      {alert && (
        <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
          {alert}
        </h5>
      )}{" "}
      <Formik
        initialValues={{
          title: title,
          cover: "",
          content: content,
          tattooStyle: tattooStyle,
        }}
        validationSchema={Yup.object({
          title: Yup.string().max(
            50,
            "Il titolo non può superare i 40 Caratteri"
          ),
          content: Yup.string().min(
            50,
            "Il contenuto deve essere di almeno 50 caratteri"
          ),
          cover: Yup.mixed().test(
            "fileFormat",
            "Invalid file format",
            (value) => {
              const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
              // Se passa il required verifica anche il formato del file
              if (!value) {
                return true;
              }
              const fileExtension = value.name.split(".").pop().toLowerCase();
              return allowedExtensions.includes(fileExtension);
            }
          ),
          tattooStyle: Yup.array().min(1, "Seleziona almeno uno style"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (!values.cover) {
            delete values.cover;
          }
          console.log("valori", values);

          patchTattooPost(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex max-w-lg flex-col gap-4 mx-auto text-left my-3">
            <div id="selectStyles" className="w-full mb-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="tattooStyle"
                  value="Seleziona lo stile del Tattoo"
                />
              </div>
              <Field
                name="tattooStyle"
                component={({ field, form }) => (
                  <Select
                    {...field}
                    options={styles}
                    isMulti
                    onChange={(selectedOptions) =>
                      form.setFieldValue("tattooStyle", selectedOptions)
                    }
                  />
                )}
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="tattooStyle" />
              </div>
            </div>

            <div id="title" className="w-full mb-2">
              <div className="mb-2 block">
                <Label htmlFor="Titolo" value="Titolo" />
              </div>
              <Field
                name="title"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeHolder="Inserisci il titolo del Post"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="title" />
              </div>
            </div>

            <div id="cover" className="w-full mb-2">
              <div className="mb-2 block">
                <Label htmlFor="cover" value="Immagine Post" />
              </div>
              <Field
                value={undefined}
                name="cover"
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={(e) =>
                  setFieldValue("cover", e.currentTarget.files[0])
                }
              />

              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="cover" />
              </div>
            </div>

            <div id="content" className="w-full mb-2">
              <div className="mb-2 block">
                <Label htmlFor="Contenuto" value="Contenuto" />
              </div>
              <Field
                name="content"
                as="textarea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeHolder="Inserisci il contenuto del Post"
              />
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage name="content" />
              </div>
            </div>
            <Button pill size="sm" type="submit">
              Modifica Post
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ModifyPost;
