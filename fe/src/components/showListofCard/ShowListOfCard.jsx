import React, { useContext } from "react";
import { GlobalProvider } from "../../context/getContext";
import CardUserCreator from "../cardUserCreator/CardUserCreator";
import CardBlog from "../cardBlog/CardBlog";
import { motion } from "framer-motion";

const ShowListOfCard = () => {
  const { filteredCreator, filteredPost, selected } =
    useContext(GlobalProvider);

  return (
    <div>
      {selected && (
        <div className="max-w-screen-2xl mx-auto py-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {selected === "creator"
            ? filteredCreator &&
              filteredCreator.map((singleCreator) => (
                <CardUserCreator key={singleCreator._id} {...singleCreator} />
              ))
            : selected === "post"
            ? filteredPost &&
              filteredPost.map((singlePost) => (
                <CardBlog key={singlePost._id} {...singlePost} />
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default ShowListOfCard;
