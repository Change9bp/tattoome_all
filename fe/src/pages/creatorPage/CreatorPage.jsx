import React, { useContext, useEffect, useState } from "react";
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
import { GlobalProvider } from "../../context/getContext";

const CreatorPage = () => {
  const { dataUser, getCalendar, calendar } = useContext(GlobalProvider);
  const [portfolio, setPortfolio] = useState(false);
  const [booking, setBooking] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newDataCreator, setNewDataCreator] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const userData = JSON.parse(localStorage.getItem("userDataDetails"));
    getCalendar(userData.id);
    addViews();
  }, []);

  useEffect(() => {
    ottieniILike();
  }, [liked]);

  useEffect(() => {
    const result = newDataCreator.some((like) => like.user === dataUser.id);
    console.log("quale è il dato di result?", result);
    setLiked(result);
  }, [newDataCreator]);

  const addViews = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${id}/views`,
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
          },
        }
      );
      console.log();
    } catch (error) {
      console.log(error.response);
    }
  };
  const ottieniILike = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${id}`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("loggedInUser")),
        },
      }
    );
    setNewDataCreator(response.data.userCreator.likes);
    console.log(
      "cosa ho salvato in new data post",
      response.data.userCreator.likes
    );
  };

  const likeIt = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/userCreator/${id}/like/${dataUser.id}`,
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

  return (
    <>
      <NavbarDropdown />
      <InfoCreator id={id} />
      <Button.Group className="flex max-w-screen-2xl justify-end mt-4 pr-20">
        <Button>{newDataCreator.length} LIKE</Button>
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
      </Button.Group>
      <div className="flex items-center justify-center py-4  flex-wrap">
        <button
          onClick={() => {
            booking && setBooking(false);
            setPortfolio(!portfolio);
          }}
          type="button"
          className={`${
            portfolio
              ? "border border-blue-600 bg-slate-700 text-white"
              : "border border-white bg-white"
          } text-gray-900 hover:border-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-500 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
        >
          Portfolio
        </button>
        <button
          onClick={() => {
            portfolio && setPortfolio(false);
            setBooking(!booking);
          }}
          type="button"
          className={`${
            booking
              ? "border border-blue-600 bg-slate-700 text-white"
              : "border border-white bg-white"
          } text-gray-900 hover:border-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-500 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3`}
        >
          Booking
        </button>
      </div>
      {portfolio ? <Portfolio id={id} /> : null}
      {booking ? (
        <div className="max-w-5xl mx-auto max-w">
          <Calendar {...calendar} />
        </div>
      ) : null}
      <FooterGlobal />
    </>
  );
};

export default CreatorPage;
