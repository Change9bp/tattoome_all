import React, { useState } from "react";
import { Button, Modal, Avatar } from "flowbite-react";
import PostDetails from "../postDetails/PostDetails";
import NavbarModal from "../navbar/NavbarModal";
import { Link } from "react-router-dom";

const CardBlogPortfolio = ({ ...singlePost }) => {
  const { title, cover, author } = singlePost;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center relative group">
        <img
          alt="Bonnie image"
          class="h-auto w-full object-cover transition-all duration-300 rounded-3xl"
          src={cover}
        />
        <div className="flex flex-col items-center rounded-3xl absolute inset-0 bg-black bg-opacity-50 justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <h5 className="mb-1 text-xl font-medium text-white text-center">
            {title}
          </h5>
          <Link to={`/creatorpage/${author._id}`}>
            <div className="flex items-center">
              <Avatar
                img={author.avatar}
                rounded
                size="md"
                className="shadow-xl"
              />
              <span className="ml-3 text-s text-white">
                {author.name} {author.lastName}
              </span>
            </div>
          </Link>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button onClick={() => setOpenModal(true)}>Leggi il Post</Button>
          </div>
        </div>
      </div>

      <Modal
        size={"7xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <NavbarModal {...singlePost} />
        <Modal.Body>
          <PostDetails {...singlePost} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardBlogPortfolio;
