import React, { useContext, useEffect } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import Jumbotron from "../../components/jumbotron/Jumbotron";
import LastAdded from "../../components/lastAdded/LastAdded";
import LastRegistered from "../../components/lastRegistered/LastRegistered";
import DropDownBar from "../../components/dropDownBar/DropDownBar";
import { GlobalProvider } from "../../context/getContext";
import FooterGlobal from "../../components/footer/Footer";

const Home = () => {
  const { dataUser, getCreatorList, creatorList, getInfoSingleCreator } =
    useContext(GlobalProvider);

  useEffect(() => {
    getCreatorList();
    dataUser && getInfoSingleCreator(dataUser.id);
  }, [dataUser]);

  return (
    <>
      <NavbarDropdown />
      <Jumbotron />
      <div>
        <DropDownBar />
        <h2 className="max-w-screen-xl mx-auto p-4 text-2xl font-extrabold text-center">
          Trova il Tatuatore più vicino a te
        </h2>
      </div>
      <h2 className="max-w-screen-xl mx-auto px-4 pt-8 text-4xl font-extrabold">
        Ultimi aggiunti dalla community
      </h2>
      <LastAdded />
      <h2 className="max-w-screen-xl mx-auto px-4 text-4xl font-extrabold">
        Ultimi creator registrati alla community
      </h2>
      <LastRegistered creatorList={creatorList} />
      <FooterGlobal />
    </>
  );
};

export default Home;
