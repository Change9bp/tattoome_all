import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { styles } from "../../data/tabelleDropdown";
import React, { useContext } from "react";
import axios from "axios";
import { GlobalProvider } from "../../context/getContext";

const FormNewPost = () => {
  const { dataUser, uploadFileCloudinary, alert, setAlert } =
    useContext(GlobalProvider);

  const newPost = async (values) => {
    if (values.cover) {
      try {
        const uploadCover = await uploadFileCloudinary(
          "cover",
          "tattooPost",
          values.cover
        );
        const finalBody = {
          ...values,
          cover: uploadCover,
          author: dataUser.id,
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
        if (response.status === 200 && response.statusText === "OK") {
          setAlert("POST inviato correttamente!");
          setTimeout(() => {
            setAlert("");
            window.location.reload();
          }, 3000);
        }
      } catch (err) {
        console.error("errore", err);
        setAlert("Errore nel caricamento dei dati riprova più tardi");
        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    }
  };

  return (
    <div className="px-4">
      <div class="my-4 rounded-3xl h-72 max-w-screen-2xl mx-auto bg-center bg-no-repeat bg-[url('https://images.pexels.com/photos/6593354/pexels-photo-6593354.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-gray-700 bg-blend-multiply flex flex-col justify-center items-center">
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
      {alert && (
        <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
          {alert}
        </h5>
      )}
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
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("valori", values.cover);
          newPost(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex max-w-lg flex-col gap-4 mx-auto">
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
            <Button pill type="submit">
              Invia Post
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormNewPost;
