import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

const FooterGlobal = () => {
  return (
    <Footer container>
      <div className="text-center w-10/12 mx-auto">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to={"/home"}>
            <Footer.Brand
              src="https://image.freepik.com/free-vector/vintage-tattoo-studio-logo-vector-illustration-monochrome-crossed-equipment-professionals_74855-11252.jpg"
              alt="Tattoo Logo"
              name="Tattoome"
              className="w-20 h-20"
            />
          </Link>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      </div>
    </Footer>
  );
};

export default FooterGlobal;
