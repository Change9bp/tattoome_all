import React, { useContext, useEffect, useState } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import { Rating, Button } from "flowbite-react";
import { VscEdit } from "react-icons/vsc";
import { GrGrow } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import FormUserProfile from "../../components/forms/FormUserProfile";
import JumboCreator from "../../components/jumbotron/JumboCreator";
import FormBecomeCreator from "../../components/forms/FormBecomeCreator";
import { GlobalProvider } from "../../context/getContext";
import FooterGlobal from "../../components/footer/FooterGlobal";

const UserPage = () => {
  const { infoSingleCreator, getInfoSingleCreator, dataUser } =
    useContext(GlobalProvider);
  const { name, lastName, avatar, role, views } = infoSingleCreator;
  const [modify, setModify] = useState(false);
  const [creator, setCreator] = useState(false);

  useEffect(() => {
    getInfoSingleCreator(dataUser.id);
  }, []);

  return (
    <>
      <NavbarDropdown />
      <main className="max-w-screen-2xl mx-auto py-10 px-4 ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-72 h-72">
            <img
              className="rounded-full w-full h-full object-cover"
              src={avatar}
              alt="user image"
            />
          </div>

          <h4 class="text-2xl font-bold my-4 dark:text-white">
            {name} {lastName}
          </h4>

          <div>
            {role === "user" ? (
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setModify(!modify);
                    creator && setCreator(!creator);
                  }}
                  className="w-52 mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                >
                  Modifica profilo
                </Button>

                <Button
                  onClick={() => {
                    setModify(!modify);
                    creator && setCreator(!creator);
                  }}
                  className="w-52 mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                >
                  <GrGrow className=" mx-2 h-5 w-5" />
                  Diventa Creator
                </Button>
              </div>
            ) : (
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setModify(!modify);
                    creator && setCreator(!creator);
                  }}
                  className="w-52 mt-2 text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                >
                  <VscEdit className="mx-2 h-5 w-5" />
                  Modifica profilo
                </Button>
              </div>
            )}
            <Button color="warning" className="mx-auto">
              <MdDeleteForever /> Cancella Utente
            </Button>
          </div>
          <div className="mx-4 my-8 w-full md:w-3/4 grid grid-cols-3">
            <div className="flex flex-col items-center truncate">
              <p className="text-center text-md font-semibold dark:text-white mb-2">
                Visualizzazioni totali
              </p>
              <p>{views}</p>
            </div>
            <div className="flex flex-col items-center truncate">
              <p className="text-center text-md font-semibold dark:text-white mb-2">
                Rating
              </p>
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
              <p className="text-center text-md font-semibold dark:text-white mb-2">
                Like
              </p>
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
      <FooterGlobal />
    </>
  );
};

export default UserPage;
