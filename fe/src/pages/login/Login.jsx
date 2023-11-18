import React from "react";
import Welcome from "../../components/welcome/Welcome";

const Login = () => {
  return (
    <div className="w-full h-screen relative">
      <video
        className="z-0 object-cover w-full h-full"
        controls=""
        autoplay=""
        loop
        preload="auto"
        muted
      >
        <source
          src="https://res.cloudinary.com/dfgsibsfc/video/upload/v1700272452/production_id_41240322_floxdh.mp4"
          type="video/mp4"
        />
      </video>
      <Welcome />
    </div>
  );
};

export default Login;
