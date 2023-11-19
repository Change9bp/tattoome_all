import React, { useContext } from "react";
import { GlobalProvider } from "../../context/getContext";
import CardUserCreator from "../cardUserCreator/CardUserCreator";
import CardBlog from "../cardBlog/CardBlog";

const ShowListOfCard = () => {
  const { filteredCreator, filteredPost, selected } =
    useContext(GlobalProvider);

  return (
    <div>
      {selected === "creator"
        ? filteredCreator &&
          filteredCreator?.map((singleCreator) => (
            <CardUserCreator {...singleCreator} />
          ))
        : selected === "post"
        ? (filteredPost &&
            filteredPost?.map((singlePost) => <CardBlog {...singlePost} />),
          console.log(filteredPost))
        : null}
    </div>
  );
};

export default ShowListOfCard;
