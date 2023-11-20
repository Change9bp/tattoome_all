import React, { useEffect, useState } from "react";
import InfoCreator from "../../components/infoCreator/InfoCreator";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import { Button } from "flowbite-react";
import Portfolio from "../../components/portfolio/Portfolio";
import Calendar from "../../components/calendar/Calendar";
import { useParams } from "react-router-dom";
import FooterGlobal from "../../components/footer/FooterGlobal";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import axios from "axios";

const CreatorPage = () => {
  const [portfolio, setPortfolio] = useState(false);
  const [booking, setBooking] = useState(false);
  // const [liked, setLiked] = useState(false);
  // const [newDataPost, setNewDataPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    addViews();
  }, []);

  const addViews = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${id}/views`
      );
      console.log();
    } catch (error) {
      console.log(error.response);
    }
  };
  // const ottieniILike = async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${id}`
  //   );
  //   setNewDataPost(response.data.post.likes);
  //   console.log("cosa ho salvato in new data post", response.data.post.likes);
  // };

  // const likeIt = async () => {
  //   try {
  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_SERVER_BASE_URL}/tattooPost/${id}/like/`
  //     );
  //     ottieniILike();
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  return (
    <>
      <NavbarDropdown />
      <InfoCreator id={id} />
      {/* <Button.Group className="flex max-w-screen-2xl justify-end mt-4 pr-20">
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
      </Button.Group> */}
      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          onClick={() => {
            booking && setBooking(false);
            setPortfolio(!portfolio);
          }}
          type="button"
          class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          Portfolio
        </button>
        <button
          onClick={() => {
            portfolio && setPortfolio(false);
            setBooking(!booking);
          }}
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Booking
        </button>
      </div>
      {portfolio ? <Portfolio id={id} /> : null}
      {booking ? <Calendar /> : null}
      <FooterGlobal />
    </>
  );
};

export default CreatorPage;
