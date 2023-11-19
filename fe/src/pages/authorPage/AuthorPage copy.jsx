import React, { useState } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import { Rating, Label, FileInput, Button, TextInput } from "flowbite-react";
import { VscEdit } from "react-icons/vsc";
import { GrGrow } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { FaLevelUpAlt } from "react-icons/fa";
import { styles } from "../../data/tabelleDropdown";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
      <main className="max-w-screen-2xl mx-auto py-8 px-4 ">
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
        {!modify ? null : (
          <form>
            <div id="fileUpload" className="w-full mb-2">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload avatar image" />
              </div>
              <FileInput
                id="file"
                helperText="A profile picture is useful to confirm your are logged into your account"
                className="w-full"
              />
            </div>

            <Button
              onClick={() => setChangePsw(!changePsw)}
              className="m-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cambia Password
            </Button>

            {changePsw ? (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your current password" />
                </div>
                <TextInput id="password1" type="password" required />

                <div className="mb-2 block">
                  <Label htmlFor="password2" value="Your new password" />
                </div>
                <TextInput id="password2" type="password" required />

                <div className="mb-2 block">
                  <Label htmlFor="password3" value="Repeat password" />
                </div>
                <TextInput id="password3" type="password" required />
              </div>
            ) : null}

            <Button
              type="submit"
              className="m-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save information
            </Button>
          </form>
        )}
        {!creator ? null : (
          <div>
            <section class="rounded-lg h-96 bg-center bg-cover bg-no-repeat bg-[url('https://images.pexels.com/photos/3727658/pexels-photo-3727658.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-gray-700 bg-blend-multiply">
              <div class="w-full h-full text-center flex flex-col justify-center items-center">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                  Diventa
                  <span className="ml-3 text-blue-600 dark:text-blue-500">
                    Creator
                  </span>{" "}
                  !
                </h1>
                <p class="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                  Registrati e condividi con la più grande community italiana di
                  appassionati di tatuaggi i tuoi lavori, permetti agli altri di
                  scoprirti ed apprezzare le tue capacità.
                </p>
              </div>
            </section>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Completa la registrazione per diventare CREATOR
            </h2>
            <form action="">
              <div className="mb-2 block">
                <Label
                  htmlFor="selectStyles"
                  value="Select your Tattoo Style"
                  className="mb-2"
                />
                <Select
                  id="selectStyles"
                  name="tattooStyles"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={styles}
                  required
                />
                <div className="mb-2 block">
                  <Label htmlFor="nazione" value="Your Nation" />
                </div>
                <TextInput id="nazione" type="text" required />

                <div className="mb-2 block">
                  <Label htmlFor="region" value="Your Region" />
                </div>
                <TextInput id="region" type="text" required />

                <div className="mb-2 block">
                  <Label htmlFor="city" value="Your City" />
                </div>
                <TextInput id="city" type="text" required />
              </div>
              <Button className="m-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaLevelUpAlt /> Diventa Creator
              </Button>
            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default AuthorPage;
