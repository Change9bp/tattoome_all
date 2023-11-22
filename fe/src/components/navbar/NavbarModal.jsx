import React, { useContext, useEffect, useState } from "react";
import { Button, Navbar, Avatar } from "flowbite-react";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GlobalProvider } from "../../context/getContext";
import axios from "axios";

const NavbarModal = ({ author, _id }) => {
  const { dataUser } = useContext(GlobalProvider);
  const [liked, setLiked] = useState(false);
  const [newDataPost, setNewDataPost] = useState([]);

  useEffect(() => {
    ottieniILike();
  }, [liked]);

  useEffect(() => {
    const result = newDataPost.some((like) => like.user === dataUser.id);
    console.log("quale è il dato di result?", result);
    setLiked(result);
  }, [newDataPost]);

  //like rotta
  const likeIt = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${_id}/like/${dataUser.id}`,
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      ottieniILike();
    } catch (error) {
      console.log(error.response);
    }
  };

  //ottengo array like
  const ottieniILike = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${_id}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
        },
      }
    );
    setNewDataPost(response.data.post.likes);
    console.log("cosa ho salvato in new data post", response.data.post.likes);
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
          <Button>{newDataPost.length} LIKE</Button>
          {liked ? (
            <Button
              onClick={() => {
                likeIt();
              }}
              color="grey"
            >
              <FaHeart className="fill-red-500 mr-3 h-4 w-4" />
              Ti piace
            </Button>
          ) : (
            <Button
              onClick={() => {
                likeIt();
              }}
              color="grey"
            >
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
