import React, { useContext, useEffect, useState } from "react";
import { Button, Label } from "flowbite-react";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import { styles } from "../../data/tabelleDropdown";
import axios from "axios";
import { GlobalProvider } from "../../context/getContext";

const SearchPost = () => {
  const { alert, setAlert, listPost, setListPost, setFilteredPost } =
    useContext(GlobalProvider);

  const [inputSearchValue, setInputSearchValue] = useState("");

  const searchPostQuery = async (finalBody) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/search`,
        finalBody
      );
      console.log("la res della ricerca per post", response);
      setListPost(response.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };

  const searchOnResponse = (inputSearch) => {
    setFilteredPost(
      listPost.filter((singlePost) => {
        console.log("risultato filtrato post", singlePost);
        return (
          singlePost.title.toLowerCase().includes(inputSearch) ||
          singlePost.content.toLowerCase().includes(inputSearch)
        );
      })
    );
  };

  useEffect(() => {
    searchOnResponse(inputSearchValue);
  }, [listPost]);

  return (
    <Formik
      initialValues={{
        tattooStyle: [],
        inputSearch: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const finalBody = {
          tattooStyle: values.tattooStyle,
        };
        setInputSearchValue(values.inputSearch.toLowerCase());
        searchPostQuery(finalBody);
      }}
    >
      <Form>
        <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto border-solid border border-slate-500 py-10 px-20 rounded-3xl">
          {alert && (
            <h5 class="animate-pulse text-center text-green-600 text-xl font-bold my-6">
              {alert}
            </h5>
          )}
          <div className="block w-full mb-4">
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
          <Field
            name="inputSearch"
            type="search"
            placeholder="Cerca i POST per Titolo e Contenuto"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-t-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />

          <Button
            type="submit"
            className="w-full text-white bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-t-none px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
  );
};

export default SearchPost;
