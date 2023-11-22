import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GlobalProvider = createContext();

const GlobalContext = ({ children }) => {
  const [selected, setSelected] = useState("");
  const [register, setRegister] = useState(false);
  const [tattooPosts, setTattooPosts] = useState([]);
  const [tattooPostsForCreator, setTattooPostsForCreator] = useState([]);
  const [creatorList, setCreatorList] = useState([]);
  const [infoSingleCreator, setInfoSingleCreator] = useState({});
  const [listPost, setListPost] = useState([]);
  const [filteredPost, setFilteredPost] = useState(null);
  const [listCreator, setListCreator] = useState([]);
  const [filteredCreator, setFilteredCreator] = useState([]);
  const [alert, setAlert] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [calendarPosted, setCalendarPosted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const navigate = useNavigate();

  //CHIAMATA PER LA GESTIONE DI CLOUDINARY
  const uploadFileCloudinary = async (key, endpoint, objFile) => {
    const fileData = new FormData();
    fileData.append(key, objFile);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/${endpoint}/cloudUpload`,
        fileData
      );
      return response.data[key];
    } catch (error) {
      console.log(error.response, "errore in upload file");
    }
  };

  // CHIAMATA GET PER I CREATOR
  const getCreatorList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/onlyCreator`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      console.log(response, "lista creator");
      setCreatorList(response.data.userCreators);
    } catch (error) {
      console.log(error.response);
      setAlert("Non è stato possibile ottenere la lista dei Creator!");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  //CHIAMATA USER GET BY ID

  const getInfoSingleCreator = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${id}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      console.log(response.data.userCreator, "single creator");
      setInfoSingleCreator(response.data.userCreator);
    } catch (error) {
      console.log(error.response);
    }
  };
  //CHIAMATA POST PER REGISTRAZIONE USER

  const registerUser = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator`,
        values,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      console.log(response);
      if (response.status === 200 && response.statusText === "OK") {
        setAlert(
          "Complimenti ti sei registrato correttamente alla piattaforma!"
        );
        setTimeout(() => {
          setAlert("");
          setRegister(!register);
        }, 3000);
      }
    } catch (error) {
      console.error("errore", error.response);
      setAlert("Non è stato possibile registrarsi alla piattaforma!");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  //chiamata DEL PER CANCELLARE UTENTE

  const delUser = async () => {
    const confirmDel = window.confirm(
      "Sei sicuro di voler cancellare il tuo profilo? Verranno cancellati anche tutti i tuoi Post, i tuoi Lik e le tue Informazioni"
    );
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${dataUser.id}`
      );
      setAlert("Utente correttamente cancellato");
      setTimeout(() => {
        setAlert("");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userDataDetails");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error.response);
      setAlert("Operazione non andata a buon fine, riprovare più tardi");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  // CHIAMATA PATCH DIVENTA CREATOR

  const creatorUpdate = async (finalBody) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${dataUser.id}`,
        finalBody,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      if (response.status === 200 && response.statusText === "OK") {
        setAlert("Complimenti sei diventato un CREATOR!");
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

  // CHIAMATA GET PER I POST CON PAGINATION
  const getTattooPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );

      setTattooPosts(response.data);
    } catch (error) {
      console.log(error.response);
      setAlert("Non e' stato possibile recuperare i post dalla piattaforma.");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  // CHIAMATA GET PER I POST DI UN SOLO CREATOR
  const getTattooPostsForCreator = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${id}/creator`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );

      setTattooPostsForCreator(response.data.findPost);
      console.log(
        "la response della chiamata dei post per creator",
        response.data
      );
    } catch (error) {
      console.log(error.response);
      setAlert("Non e' stato possibile recuperare i post dalla piattaforma.");
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  //CHIAMATA DELETE DEI TATTOPOST
  const delPost = async (postId) => {
    const confirmDel = window.confirm(
      "Sei sicuro di voler cancellare il post?"
    );
    if (confirmDel) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${postId}`,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
            },
          }
        );
        console.log(response);
        //   navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //CHIAMATA ALLA ROTTA DI LOGIN CHE SALVA IN LOCAL.STORAGE IL TOKEN

  const loginUser = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/login`,
        values
      );
      if (response.data.token) {
        console.log("stai salvando il token", response.data.token);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.token)
        );
        navigate("/home"); //vengo reindirizzato alla HOME PAGE
      }
      console.log(response, "la res");
    } catch (error) {
      console.log(error.response);
    }
  };

  //CHIAMATA PER OTTENERE EVENTI CALENDAR PER ID

  const getCalendar = async (creatorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/calendar/${creatorId}`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      setCalendar(response.data.calendar);
    } catch (error) {
      console.log(error.response);
    }
  };

  //CALENDAR POST

  const postCalendar = async (finalBody) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/calendar`,
        finalBody,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      setCalendarPosted(!calendarPosted);
    } catch (error) {
      console.log(error.response);
    }
  };

  //CALENDAR PATCH

  const patchCalendar = async (finalBody) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/calendar`,
        finalBody,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      if (response.status === 200 && response.statusText === "OK") {
        setAlert("Complimenti sei diventato un CREATOR!");
        setTimeout(() => {
          setAlert("");
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
    <GlobalProvider.Provider
      value={{
        selected,
        setSelected,
        registerUser,
        loginUser,
        getTattooPosts,
        uploadFileCloudinary,
        getCreatorList,
        getInfoSingleCreator,
        getTattooPostsForCreator,
        delPost,
        creatorList,
        tattooPosts,
        currentPage,
        setCurrentPage,
        infoSingleCreator,
        setInfoSingleCreator,
        dataUser,
        setDataUser,
        alert,
        setAlert,
        setTattooPostsForCreator,
        creatorUpdate,
        register,
        setRegister,
        listPost,
        setListPost,
        filteredPost,
        setFilteredPost,
        listCreator,
        setListCreator,
        filteredCreator,
        setFilteredCreator,
        tattooPostsForCreator,
        delUser,
        calendar,
        setCalendar,
        getCalendar,
        calendarPosted,
        setCalendarPosted,
        postCalendar,
        patchCalendar,
      }}
    >
      {children}
    </GlobalProvider.Provider>
  );
};

export default GlobalContext;
