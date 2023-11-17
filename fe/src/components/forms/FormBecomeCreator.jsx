import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { GlobalProvider } from "../../context/getContext";
import { styles, nation, region, city } from "../../data/tabelleDropdown";

const FormBecomeCreator = () => {
  const { alert, setAlert, creatorUpdate } = useContext(GlobalProvider);

  return (
    <Formik
      initialValues={{
        tattooStyle: [],
        nation: "",
        region: "",
        city: "",
        address: "",
      }}
      validationSchema={Yup.object({
        nation: Yup.object().required("La nazione è obbligatoria"),
        region: Yup.object().required("La regione è obbligatoria"),
        city: Yup.object().required("La città è obbligatoria"),
        address: Yup.string().required("L'indirizzo è obbligatorio"),
        tattooStyle: Yup.array().min(1, "Seleziona almeno uno style"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const finalBody = {
          nation: values.nation.value,
          region: values.region.value,
          city: values.city.value,
          address: values.address,
          tattooStyle: values.tattooStyle,
          role: "creator",
        };
        creatorUpdate(finalBody);
      }}
    >
      {alert && (
        <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
          {alert}
        </h5>
      )}
      <Form className="flex max-w-lg flex-col gap-3 mx-auto">
        <div className="block">
          <Label
            htmlFor="tattooStyle"
            value="Seleziona gli stili di tatuaggio di cui ti occupi"
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
        <ErrorMessage
          className="text-red-500 text-sm mt-1"
          name="tattooStyle"
          component="div"
        />

        <div className="block">
          <Label htmlFor="nation" value="Seleziona la tua nazione" />
        </div>
        <Field
          name="nation"
          component={({ field, form }) => (
            <Select
              {...field}
              options={nation}
              onChange={(selectedOptions) =>
                form.setFieldValue("nation", selectedOptions)
              }
            />
          )}
        />
        <ErrorMessage
          className="text-red-500 text-sm mt-1"
          name="nation"
          component="div"
        />

        <div className="block">
          <Label htmlFor="region" value="Seleziona la tua regione" />
        </div>
        <Field
          name="region"
          component={({ field, form }) => (
            <Select
              {...field}
              options={region}
              onChange={(selectedOptions) => {
                form.setFieldValue("region", selectedOptions);
              }}
            />
          )}
        />
        <ErrorMessage
          className="text-red-500 text-sm mt-1"
          name="region"
          component="div"
        />

        <div className="block">
          <Label htmlFor="city" value="Seleziona la tua città" />
        </div>
        <Field
          name="city"
          component={({ field, form }) => (
            <Select
              {...field}
              options={city}
              onChange={(selectedOptions) =>
                form.setFieldValue("city", selectedOptions)
              }
            />
          )}
        />
        <ErrorMessage
          className="text-red-500 text-sm mt-1"
          name="city"
          component="div"
        />

        <div className="block">
          <Label htmlFor="address" value="Inserisci il tuo indirizzo" />
        </div>
        <Field
          type="text"
          name="address"
          placeholder="Inserisci il tuo Nome"
          className="shadow-sm bg-gray-50/10 hover:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        <ErrorMessage name="address" component="div" />

        <Button
          type="submit"
          className="w-full mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Salva le informazioni
        </Button>
      </Form>
    </Formik>
  );
};

export default FormBecomeCreator;
