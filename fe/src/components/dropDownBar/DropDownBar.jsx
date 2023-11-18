import React, { useState } from "react";
import { Button, Label } from "flowbite-react";
import Select from "react-select";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { city, nation, region, styles } from "../../data/tabelleDropdown";
import axios from "axios";
import CardUserCreator from "../cardUserCreator/CardUserCreator";

const DropDownBar = (values) => {
  const [listCreator, setListCreator] = useState([]);
  const [filteredCreator, setFilteredCreator] = useState([]);

  const searchCreatorQuery = async (finalBody) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/search`,
        finalBody
      );
      console.log("la res della ricerca per ccreator", response);
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
    <>
      {" "}
      <div>
        <span className="m-auto font-bold">Filtra i contenuti:</span>
        <Formik
          initialValues={{
            tattooStyle: [],
            nation: "Italia",
            region: "",
            city: "",
            inputSearch: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            const finalBody = {
              nation: values.nation.value,
              region: values.region.value,
              city: values.city.value,
              tattooStyle: values.tattooStyle,
            };
            searchCreatorQuery(finalBody);
            searchOnResponse(values.inputSearch);
            console.log("valore della query di ricerca", finalBody);
          }}
        >
          {/* {alert && (
          <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
            {alert}
          </h5> */}
          <Form>
            <div className="py-8 px-4 grid grid-cols-4 gap-4 mx-auto">
              <div className="block rounded-2xl">
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
                <Label htmlFor="nation" value="cerca per nazione" />
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
                />{" "}
              </div>

              <div className="block">
                <Label htmlFor="region" value="cerca per regione" />
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

            <div className="flex max-w-screen-md mx-auto">
              <div className="relative w-full">
                <Field
                  name="inputSearch"
                  type="search"
                  placeholder="Cerca il tuo tatuatore per Nome, Cognome o Alias"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
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
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Salva le informazioni
            </Button>
          </Form>
        </Formik>
      </div>
      <div>
        {filteredCreator.map((singleCreator) => (
          <CardUserCreator {...singleCreator} />
        ))}
      </div>
    </>
  );
};

export default DropDownBar;
