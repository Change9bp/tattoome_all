import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterGlobal = () => {
  return (
    <Footer container>
      <div className="text-center w-10/12 mx-auto">
        <div className="w-full justify-center flex items-center">
          <Link to={"/home"}>
            <Footer.Brand
              src="https://image.freepik.com/free-vector/vintage-tattoo-studio-logo-vector-illustration-monochrome-crossed-equipment-professionals_74855-11252.jpg"
              alt="Tattoo Logo"
              name="TattooMe"
              className="w-20 h-20"
            />
          </Link>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="TattooMe™" year={2023} />
      </div>
    </Footer>
  );
};

export default FooterGlobal;
