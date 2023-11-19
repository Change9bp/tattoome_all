import React from "react";

const Jumbotron = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid max-w-screen-xl px-4 py-4 mx-auto gap-0 lg:py-8 lg:grid-cols-12 ">
        <div className="py-20 px-4 rounded-3xl mr-auto place-self-center lg:col-span-7 bg-blend-multiply bg-no-repeat bg-cover bg-center bg-slate-500 bg-[url('https://images.pexels.com/photos/5490263/pexels-photo-5490263.jpeg')] lg:bg-none ">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-white lg:text-black">
            La più grande community italiana sui Tattoo
          </h1>
          <p className="max-w-2xl mb-6 text-stone-200 font-normal lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Cerca il tuo artista preferito, esplora, commenta, prenota.
          </p>
          <p className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white lg:text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Diventa CREATOR
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white lg:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Completa la registrazione
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            className="rounded-3xl"
            src="https://images.pexels.com/photos/5490263/pexels-photo-5490263.jpeg"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
