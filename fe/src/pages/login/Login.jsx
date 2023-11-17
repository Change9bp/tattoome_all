import React from "react";
import Welcome from "../../components/welcome/Welcome";
import BackgroundVideo from "react-background-video";

const Login = () => {
  return (
    <BackgroundVideo loop={true} muted={true} autoPlay={true}>
      <source
        src="https://player.vimeo.com/external/406186651.sd.mp4?s=c88d37abd12460c50ab652cd0a2559b1087b1f13&profile_id=164&oauth2_token_id=57447761"
        type="video/mp4"
      />
      <Welcome />
    </BackgroundVideo>
  );
};

export default Login;
