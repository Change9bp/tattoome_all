import React from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import FormNewPost from "../../components/forms/FormNewPost";
import FooterGlobal from "../../components/footer/FooterGlobal";

const NewPost = () => {
  return (
    <>
      <NavbarDropdown />
      <FormNewPost />
      <FooterGlobal />
    </>
  );
};

export default NewPost;
