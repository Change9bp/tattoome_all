import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { styles } from "../../data/tabelleDropdown";
import React, { useState } from "react";
import axios from "axios";

const FormNewPost = () => {
  const uploadFileCloudinary = async (cover) => {
    console.log(cover, "cover del file");
    const fileData = new FormData();
    fileData.append("cover", cover);

    console.log("bella caro", cover);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/cloudUpload`,
        fileData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      return response.data.cover;
    } catch (error) {
      console.log(error.response, "errore in upload file");
    }
  };

  const newPost = async (values) => {
    console.log(`${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost`);
    if (values.cover) {
      try {
        const uploadCover = await uploadFileCloudinary(values.cover);
        const finalBody = {
          ...values,
          cover: uploadCover,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost`,
          finalBody
          /*{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
        },
      }*/
        );
        console.log(response);
      } catch (err) {
        console.error("errore", err);
      }
    }
  };

  return (
    <>
      <div class="my-4 rounded-xl h-72 max-w-screen-xl mx-auto bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/6593354/pexels-photo-6593354.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-gray-700 bg-blend-multiply flex flex-col justify-center items-center">
        <h1 className="mb-4 mx-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Aggiungi un POST
          </span>{" "}
          , mostrati.
        </h1>
        <p className="text-lg mx-6 font-normal text-gray-400 lg:text-xl dark:text-gray-400">
          Fatti conoscere, mostra alla community i tuoi lavori e la tua
          creatvità!
        </p>
      </div>

      <h3 class="mb-4 text-2xl text-center font-bold dark:text-white">
        Dai un TITOLO, aggiungi una FOTO, scrivi il TUO CONTENUTO
      </h3>

      <Formik
        initialValues={{
          title: "",
          cover: "",
          content: "",
          tattooStyle: [],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(40, "Il titolo non può superare i 40 Caratteri")
            .required("Required"),
          content: Yup.string()
            .min(50, "Il contenuto deve essere di almeno 50 caratteri")
            .required("Required"),
          cover: Yup.mixed()
            .required("L'immagine del Post è richiesta")
            .test("fileFormat", "Invalid file format", (value) => {
              const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

              console.log(value.name, "consolelog del value immagine");

              // Se passa il required verifica anche il formato del file
              const fileExtension = value.name.split(".").pop().toLowerCase();
              return allowedExtensions.includes(fileExtension);
            }),
          tattooStyle: Yup.array().min(1, "Seleziona almeno uno style"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("valori", values.cover);
          newPost(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex max-w-lg flex-col gap-4 mx-auto">
            <div id="selectStyles" className="w-full mb-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="selecStyles"
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
            <Button pill type="submit">
              Invia Post
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormNewPost;
