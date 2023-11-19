import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import { city, region, styles } from "../../data/tabelleDropdown";
import axios from "axios";
import CardUserCreator from "../cardUserCreator/CardUserCreator";
import { GlobalProvider } from "../../context/getContext";

const SearchCreator = () => {
  const {
    alert,
    setAlert,
    listCreator,
    setListCreator,
    filteredCreator,
    setFilteredCreator,
  } = useContext(GlobalProvider);

  const searchCreatorQuery = async (finalBody) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/search`,
        finalBody
      );
      console.log("la res della ricerca per creator", response);
      setListCreator(response.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };

  const searchOnResponse = (inputSearch) => {
    setFilteredCreator(
      listCreator.filter((singleCreator) => {
        return (
          singleCreator.name.includes(inputSearch) ||
          singleCreator.lastName.includes(inputSearch) ||
          singleCreator.alias.includes(inputSearch)
        );
      })
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          tattooStyle: [],
          region: "",
          city: "",
          inputSearch: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const finalBody = {
            region: values.region.value,
            city: values.city.value,
            tattooStyle: values.tattooStyle,
          };
          await searchCreatorQuery(finalBody);
          searchOnResponse(values.inputSearch);
          console.log("valore della query di ricerca", finalBody);
        }}
      >
        <Form className="border-solid border border-slate-500 shadow-xl py-10 px-20 max-w-screen-xl mx-auto rounded-full">
          <div className=" grid grid-cols-3 gap-16">
            <div className="block">
              {alert && (
                <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
                  {alert}
                </h5>
              )}
              <Label htmlFor="tattooStyle" value="Cerca per stile" />
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
            </div>
            <div className="block">
              <Label htmlFor="region" value="Cerca per regione" />
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
              />{" "}
            </div>

            <div className="block">
              <Label htmlFor="city" value="Cerca per città" />
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
              />{" "}
            </div>
          </div>

          <div className="flex pt-7 flex-col items-center justify-center max-w-screen-md mx-auto">
            <Field
              name="inputSearch"
              type="search"
              placeholder="Cerca il tuo tatuatore per Nome, Cognome o Alias"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />

            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              AVVIA LA RICERCA
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchCreator;
