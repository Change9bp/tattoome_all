import React, { useContext, useEffect } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import Jumbotron from "../../components/jumbotron/Jumbotron";
import LastAdded from "../../components/lastAdded/LastAdded";
import LastRegistered from "../../components/lastRegistered/LastRegistered";
import SearchCreator from "../../components/searchArea/SearchCreator";
import { GlobalProvider } from "../../context/getContext";
import FooterGlobal from "../../components/footer/FooterGlobal";
import SearchPost from "../../components/searchArea/SearchPost";
import SelectCreatorOrPost from "../../components/searchArea/SelectCreatorOrPost";
import ShowListOfCard from "../../components/showListofCard/ShowListOfCard";

const Home = () => {
  const {
    dataUser,
    getCreatorList,
    creatorList,
    getInfoSingleCreator,
    selected,
  } = useContext(GlobalProvider);

  useEffect(() => {
    getCreatorList();
    dataUser && getInfoSingleCreator(dataUser.id);
  }, [dataUser]);

  return (
    <>
      <NavbarDropdown />
      <Jumbotron />
      <div>
        <h2 className="max-w-screen-2xl mx-auto my-10 text-xl md:text-2xl lg:text-4xl font-extrabold text-center">
          Trova il Tatuatore più vicino a te
        </h2>
        <SelectCreatorOrPost />
        {selected === "creator" ? (
          <SearchCreator />
        ) : selected === "post" ? (
          <SearchPost />
        ) : null}
        <ShowListOfCard />
      </div>
      <h2 className="max-w-screen-2xl mx-auto px-4 text-xl md:text-2xl lg:text-4xl font-extrabold">
        Ultimi aggiunti dalla community
      </h2>
      <LastAdded />
      <h2 className="max-w-screen-2xl mx-auto px-4 pt-8 text-xl md:text-2xl lg:text-4xl font-extrabold">
        Ultimi creator registrati alla community
      </h2>
      <LastRegistered creatorList={creatorList} />
      <FooterGlobal />
    </>
  );
};

export default Home;
