import React from "react";

const JumboCreator = () => {
  return (
    <section class="rounded-lg h-96 bg-center bg-cover bg-no-repeat bg-[url('https://images.pexels.com/photos/3727658/pexels-photo-3727658.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-gray-700 bg-blend-multiply">
      <div class="w-full h-full text-center flex flex-col justify-center items-center">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Diventa
          <span className="ml-3 text-blue-600 dark:text-blue-500">
            Creator
          </span>{" "}
          !
        </h1>
        <p class="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Registrati e condividi con la più grande community italiana di
          appassionati di tatuaggi i tuoi lavori, permetti agli altri di
          scoprirti ed apprezzare le tue capacità.
        </p>
      </div>
    </section>
  );
};

export default JumboCreator;
