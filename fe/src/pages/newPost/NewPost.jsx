import React, { useEffect } from "react";
import NavbarDropdown from "../../components/navbar/NavbarDropdown";
import FormNewPost from "../../components/forms/FormNewPost";
import FooterGlobal from "../../components/footer/FooterGlobal";

const NewPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavbarDropdown />
      <FormNewPost />
      <FooterGlobal />
    </>
  );
};

export default NewPost;
