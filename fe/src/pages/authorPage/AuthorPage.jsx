import React, { useState } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import { Rating, Label, FileInput, Button, TextInput } from "flowbite-react";
import { VscEdit } from "react-icons/vsc";
import { GrGrow } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import makeAnimated from "react-select/animated";
import FormUserProfile from "../../components/forms/FormUserProfile";
import JumboCreator from "../../components/jumbotron/JumboCreator";
import FormBecomeCreator from "../../components/forms/FormBecomeCreator";

const animatedComponents = makeAnimated();

const AuthorPage = () => {
  const [modify, setModify] = useState(false);
  const [changePsw, setChangePsw] = useState(false);
  const [creator, setCreator] = useState(false);

  // qundo passi a creator devi proporre la possibilità di selezionare più stili di tattoo tramite input select multiplo
  //devi frgli selezionare nzione regione città tramite select

  return (
    <>
      <NavbarDropdown />
      <main className="max-w-screen-xl mx-auto py-8 px-4 ">
        <div className="flex flex-col justify-center items-center">
          <div>
            <img
              className="rounded-full w-72 h-72"
              src="https://th.bing.com/th/id/OIP.nOlw71Qhp4ct_pUV2B3nBgAAAA?pid=ImgDet&rs=1"
              alt="user image"
            />
          </div>

          <h1 className="text-bold text-lg">Nome Utente</h1>
          <div>
            <div>
              {" "}
              <a
                onClick={() => {
                  setModify(!modify);
                  creator && setCreator(!creator);
                }}
                href="#"
                className="m-4 w-52 inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-lg font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                <VscEdit className="mx-2 h-5 w-5" />
                Modifica Profilo
              </a>
              <a
                onClick={() => {
                  setCreator(!creator);
                  modify && setModify(!modify);
                }}
                href="#"
                className="m-4 w-52 inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-lg font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                <GrGrow className=" mx-2 h-5 w-5" />
                Diventa Creator
              </a>
            </div>
            <Button color="warning" className="mx-auto">
              <MdDeleteForever /> Cancella Utente
            </Button>
          </div>
          <div className="m-4 w-full md:w-3/4 grid grid-cols-3">
            <div className="flex flex-col items-center truncate">
              <p>Visualizzazioni totali</p>
              <p>0</p>
            </div>
            <div className="flex flex-col items-center truncate">
              <p>Rating</p>
              <Rating>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95 out of 5
                </p>
              </Rating>
            </div>
            <div className="flex flex-col items-center truncate">
              <p>Classifica</p>
              <p>0</p>
            </div>
          </div>
        </div>
        {!modify ? null : <FormUserProfile />}
        {!creator ? null : (
          <div>
            <JumboCreator />
            <h2 className="my-6 text-2xl font-bold text-gray-800 text-center">
              Completa la registrazione per diventare CREATOR
            </h2>
            <FormBecomeCreator />{" "}
          </div>
        )}
      </main>
    </>
  );
};

export default AuthorPage;
