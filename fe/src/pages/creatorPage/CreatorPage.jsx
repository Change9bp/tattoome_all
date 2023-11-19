import React, { useState } from "react";
import InfoCreator from "../../components/infoCreator/InfoCreator";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import { Button } from "flowbite-react";
import Portfolio from "../../components/portfolio/Portfolio";
import FlashTattoo from "../../components/flashTattoo/FlashTattoo";
import Calendar from "../../components/calendar/Calendar";
import { useParams } from "react-router-dom";
import FooterGlobal from "../../components/footer/FooterGlobal";

const CreatorPage = () => {
  const [portfolio, setPortfolio] = useState(false);
  const [flash, setFlash] = useState(false);
  const [booking, setBooking] = useState(false);
  const { id } = useParams();

  return (
    <>
      <NavbarDropdown />
      <InfoCreator id={id} />
      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          onClick={() => {
            flash && setFlash(false);
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
            booking && setBooking(false);
            setFlash(!flash);
          }}
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Flash Tattoo
        </button>
        <button
          onClick={() => {
            portfolio && setPortfolio(false);
            flash && setFlash(false);
            setBooking(!booking);
          }}
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Booking
        </button>
      </div>
      {portfolio ? <Portfolio id={id} /> : null}
      {flash ? <FlashTattoo /> : null}
      {booking ? <Calendar /> : null}
      <FooterGlobal />
    </>
  );
};

export default CreatorPage;
