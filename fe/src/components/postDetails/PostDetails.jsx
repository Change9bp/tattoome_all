import React, { useContext, useRef, useState } from "react";
import { GlobalProvider } from "../../context/getContext";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Button } from "flowbite-react";
import ModifyPost from "../modifyPost/ModifyPost";

const PostDetails = ({ ...singlePost }) => {
  const { _id, title, content, cover, tattooStyle, author } = singlePost;
  const [modify, setModify] = useState(false);
  const { dataUser, delPost } = useContext(GlobalProvider);
  const [objFit, setObjFit] = useState(null);
  const imgRef = useRef(null);

  const handleImgDimension = () => {
    console.log(
      "altezza",
      imgRef.current.naturalHeight,
      "lunghezza",
      imgRef.current.naturalWidth
    );

    let aspect =
      imgRef.current.naturalWidth >= imgRef.current.naturalHeight
        ? imgRef.current.naturalWidth / imgRef.current.naturalHeight
        : imgRef.current.naturalHeight / imgRef.current.naturalWidth;
    console.log("aspect aspect", aspect);
    const newObjFit =
      aspect >= 0.95 && aspect <= 1.05
        ? "object-cover"
        : aspect >= 1.3 && aspect <= 1.9
        ? "object-contain"
        : null;
    return newObjFit;
  };

  return (
    <div className="lg:w-4/6 w-3/4 mx-auto mb-19">
      <h1 className="text-5xl font-extrabold dark:text-white text-center mb-2">
        {title}
      </h1>
      <p className="text-2xl text-right ml-2 mb-8 font-semibold text-gray-500 dark:text-gray-400">
        Tattoo style:
        <small className="text-2xl ml-2 font-light text-gray-500 dark:text-gray-400">
          {tattooStyle.map((style) => (
            <span className="ml-2">{style.value} -</span>
          ))}
        </small>
      </p>

      <a href={cover}>
        <div className="lg:w-5/6 w-3/4 h-96 mx-auto">
          <img
            ref={imgRef}
            className={`w-full h-full ${objFit}`}
            src={cover}
            alt="image description"
            onLoad={() => setObjFit(handleImgDimension)}
          />
        </div>
      </a>
      {dataUser.id === author._id ? (
        <div className="text-right my-3">
          {" "}
          <Button.Group>
            <Button size="xs" color="info" onClick={() => setModify(!modify)}>
              <FaEdit className=" mr-3 h-4 w-4" />
              Modifica
            </Button>
            <Button onClick={() => delPost(_id)} size="xs" color="red">
              <FaTrashCan className="mr-3 h-4 w-4" />
              Cancella
            </Button>
          </Button.Group>{" "}
          {modify && (
            <ModifyPost {...singlePost} setModify={setModify} modify={modify} />
          )}
        </div>
      ) : null}
      <p className="my-10 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {content}
      </p>
    </div>
  );
};

export default PostDetails;
