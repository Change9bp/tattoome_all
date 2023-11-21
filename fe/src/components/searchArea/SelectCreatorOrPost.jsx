import React, { useContext } from "react";
import { Button, Label } from "flowbite-react";
import { GlobalProvider } from "../../context/getContext";

const SelectCreatorOrPost = () => {
  const { setSelected } = useContext(GlobalProvider);

  return (
    <div className="w-max-screen-lg px-4 flex justify-center mb-8">
      <div className="rounded-full w-40 h-40 md:w-60 md:h-60 xl:w-72 xl:h-72 relative md:mx-10 mx-5">
        <div
          onClick={() => setSelected("creator")}
          className="flex flex-col items-center rounded-3xl absolute inset-0 z-10 bg-black bg-opacity-50 justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
        >
          <h5 className="mb-1 text-4xl font-medium text-white">CREATOR</h5>
        </div>
        <video
          className="z-0 rounded-3xl object-cover w-full h-full pointer-events-none"
          controls=""
          autoPlay
          loop
          preload="auto"
          muted
        >
          <source
            src="https://player.vimeo.com/external/406261392.sd.mp4?s=dcb96543ff099e6b106baf33c38a16bbd4bb3d45&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="rounded-full w-40 h-40 md:w-60 md:h-60 xl:w-72 xl:h-72 relative md:mx-10 mx-5">
        <div
          onClick={() => setSelected("post")}
          className="flex flex-col items-center rounded-3xl absolute inset-0 z-10 bg-black bg-opacity-50 justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
        >
          <h5 className="mb-1 text-4xl font-medium text-white">POST</h5>
        </div>
        <video
          className="rounded-3xl z-0 object-cover w-full h-full"
          controls=""
          autoPlay
          loop
          preload="auto"
          muted
        >
          <source
            src="https://player.vimeo.com/external/406248545.hd.mp4?s=80e2b92503a352178e6c5ee8533b93b9cd4fa342&profile_id=174&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default SelectCreatorOrPost;
