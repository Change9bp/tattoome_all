import React from "react";
import { Button, Navbar, Avatar } from "flowbite-react";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavbarModal = ({ author }) => {
  return (
    <Navbar fluid rounded className="sm:px-9">
      <Link to={`/creatorPage/${author._id}`}>
        <Avatar img={author.avatar} rounded size="lg">
          <div className="space-y-1 font-medium dark:text-white">
            <div>
              {author.name} {author.lastName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Creator
            </div>
          </div>
        </Avatar>
      </Link>

      <div className="flex md:order-2">
        <Button.Group>
          <Button color="grey">
            <FaHeart className="fill-red-500 mr-3 h-4 w-4" />
            Mi piace
          </Button>
          <Button color="grey">
            <FaBookmark className="fill-red-500 mr-3 h-4 w-4" />
            Preferiti
          </Button>
        </Button.Group>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavbarModal;
