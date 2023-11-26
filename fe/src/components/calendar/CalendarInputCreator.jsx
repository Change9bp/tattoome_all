import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useEffect } from "react";
import { Button, Label } from "flowbite-react";
import * as Yup from "yup";
import { GlobalProvider } from "../../context/getContext";

const CalendarInputCreator = ({ events }) => {
  const {
    alert,
    calendar,
    dataUser,
    getCalendar,
    postCalendar,
    patchCalendar,
    calendarPosted,
  } = useContext(GlobalProvider);

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("userDataDetails"));
  //   getCalendar(userData.id);
  // }, []);

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{
          title: "",
          start: "",
          end: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(20, "Il titolo non può superare i 30 Caratteri")
            .required("Required"),
          start: Yup.date().required("Il campo data è obbligatorio"),
          end: Yup.date().required("Il campo data è obbligatorio"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const finalBody = {
            events: {
              title: values.title,
              start: new Date(values.start).toISOString(),
              end: new Date(values.end).toISOString(),
            },
            creator: dataUser.id,
          };
          console.log(finalBody, "i valoriiiiiiiiiiiiiiii");
          events ? patchCalendar(finalBody) : postCalendar(finalBody);
          console.log(events, "eventsssssss");
        }}
      >
        <Form className=" w-3/4">
          <h4 className="text-2xl font-bold dark:text-white pb-4">
            Inserisci i tuoi appuntamenti
          </h4>
          <div className="mb-2 block">
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Titolo dell'evento
            </Label>
            <Field
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage name="title" />
            </div>
          </div>

          <div className="mb-2 block">
            <Label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              inizio evento
            </Label>
            <Field
              type="datetime-local"
              id="start"
              name="start"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage name="start" />
            </div>
          </div>

          <div className="mb-2 block">
            <Label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              Fine evento
            </Label>
            <Field
              type="datetime-local"
              id="end"
              name="end"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage name="end" />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Invia
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CalendarInputCreator;
