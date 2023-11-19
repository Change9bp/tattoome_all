import React, { useContext, useEffect, useState } from "react";
import { Button, Navbar, Avatar } from "flowbite-react";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GlobalProvider } from "../../context/getContext";
import axios from "axios";

const NavbarModal = ({ author, _id, likes }) => {
  const { dataUser } = useContext(GlobalProvider);
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    const result = likes.some((like) => like.user === dataUser.id);
    setLiked(result);
    console.log("liked è true oo false?", result);
  }, [likes]);

  //like rotta
  const likeIt = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${_id}/like/${dataUser.id}`
      );
      console.log("la res del like", response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Navbar fluid rounded className="sm:px-9">
      <Link to={`/creatorPage/${author._id}`}>
        <div className="flex justify-between items-center">
          <div class="relative w-20 h-20 mr-3">
            <img
              class="w-full h-full rounded-full object-cover"
              src={author.avatar}
              alt="avatar"
            />
            <span class="top-0 left-16 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div className="space-y-1 font-medium dark:text-white">
            <div>
              {author.name} {author.lastName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Creator
            </div>
          </div>
        </div>
      </Link>

      <div className="flex md:order-2">
        <Button.Group>
          {liked ? (
            <Button onClick={() => likeIt()} color="grey">
              <FaHeart className="fill-red-500 mr-3 h-4 w-4" />
              Ti piace
            </Button>
          ) : (
            <Button onClick={() => likeIt()} color="grey">
              <CiHeart className="mr-3 h-4 w-4" />
              Mi piace
            </Button>
          )}
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
