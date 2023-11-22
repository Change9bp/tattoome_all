import React, { useContext, useEffect } from "react";
import { Dropdown, Navbar, Avatar, Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GlobalProvider } from "../../context/getContext";

const NavbarDropdown = () => {
  const { infoSingleCreator } = useContext(GlobalProvider);
  const { role, name, lastName, avatar } = infoSingleCreator;
  const { dataUser } = useContext(GlobalProvider);

  const Navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userDataDetails");
    Navigate("/");
  };

  return (
    <div className="z-20 top-0 left-0 shadow-sm sticky">
      <Navbar fluid rounded className="max-w-screen-2xl mx-auto py-0">
        <Link to={"/home"}>
          <Navbar.Brand>
            <Avatar
              img="https://image.freepik.com/free-vector/vintage-tattoo-studio-logo-vector-illustration-monochrome-crossed-equipment-professionals_74855-11252.jpg"
              rounded
              size="lg"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Tattoome
            </span>
          </Navbar.Brand>
        </Link>

        <div className="flex md:order-2">
          <Link to="/newpost">
            <Button size="sm" outline pill className="mx-2">
              Add Post <FaPlus className="ml-2 h-6 w-6" />
            </Button>
          </Link>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div class="relative w-10 h-10">
                <img
                  class="w-full h-full rounded-full object-cover"
                  src={dataUser && dataUser.avatar}
                  alt="avatar"
                />
                <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {name} {lastName}
              </span>
              <span className="block truncate text-sm font-medium">{role}</span>
            </Dropdown.Header>
            <Link to={"/userpage"}>
              <Dropdown.Item>Impostazioni</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarDropdown;
