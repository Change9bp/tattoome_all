import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const CardUserCreator = ({ _id, name, lastName, avatar, role }) => {
  return (
    <div className="flex rounded-2xl border border-gray-200 bg-white shadow-md flex-col relative p-0">
      <div className="flex flex-col items-center relative group">
        <img
          alt="Bonnie image"
          class="aspect-square h-auto w-full object-cover transition-all duration-300 rounded-2xl"
          src={avatar}
        />
        <div className="flex flex-col items-center rounded-2xl absolute inset-0 bg-black bg-opacity-50 justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <h5 className="mb-1 text-xl font-medium text-white">
            {name} {lastName}
          </h5>
          <span className="text-s text-white">{role}</span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link to={`/creatorpage/${_id}`}>
              <Button>Visita la sua pagina</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserCreator;
