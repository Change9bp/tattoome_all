import React from "react";
import CardUserCreator from "../cardUserCreator/CardUserCreator";

const LastRegistered = ({ creatorList }) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {creatorList?.map((singleCreator) => (
        <CardUserCreator key={singleCreator._id} {...singleCreator} />
      ))}
    </div>
  );
};

export default LastRegistered;
